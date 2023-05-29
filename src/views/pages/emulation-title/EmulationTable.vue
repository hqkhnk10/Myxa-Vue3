<template>
  <div class="main__body">
    <div class="main__body-table">
      <misa-table
        v-model="table"
        checkbox
        :loading="loading"
        :pagination="pagination"
        :filterValue="filterValue"
        :filterApi="true"
        :keyword="keyword"
        ref="misaTable"
        @select="selectRow"
        @dbclick-row="formEdit"
        @change-pagination="changePagination"
        @change-sort="changeSort"
      >
        <template #applyObject="row">
            {{ formatApplyObjectTable(row.applyObject) }}
        </template>
        <template #commendationLevel="row">
            {{ formatCommendationLevelTable(row.commendationLevel) }}
        </template>
        <template #movementType="row">
            {{ formatMovementTypeTable(row.movementType) }}
        </template>
        <template #inactive="row">
          <div class="flex items-center gap-4px">
            <div :class="formatStatusTable(row.inactive).class"></div>
            <div>
              {{ formatStatusTable(row.inactive).label }}
            </div>
          </div>
        </template>
        <template #operator="row">
          <div class="button-icon-table" @click="formEdit(row)">
            <div class="tooltip tooltip__icon-pencil">
              <div class="icon__pencil"></div>
              <span class="tooltiptext tooltiptext-top">{{
                t("reuse.edit")
              }}</span>
            </div>
          </div>
          <div class="button-icon-table">
            <misa-dropdown
              :header="false"
              position="right"
              v-model="showDropdownEdit"
              :arrow="false"
              :mouseleave="true"
            >
              <template #click>
                <div class="tooltip flex items-center h-full">
                  <div class="table-dropdown-icon" @click="toogleDropdownEdit">
                    <div class="icon__threedots"></div>
                  </div>
                  <span class="tooltiptext tooltiptext-top dropdown"
                    >{{ t("reuse.more") }}...</span
                  >
                </div>
              </template>
              <template #content>
                <a
                  :class="{ 'content-disabled': !row?.inactive }"
                  @click="changeStatus(row, 0)"
                  >{{ t("reuse.using") }}</a
                >
                <a
                  :class="{ 'content-disabled': row?.inactive }"
                  @click="changeStatus(row, 1)"
                  >{{ t("reuse.shutdown") }}</a
                >
                <a class="content-red" @click="openConfirmDialog(row)">{{
                  t("reuse.remove")
                }}</a>
              </template>
            </misa-dropdown>
        </div>
        </template>
      </misa-table>
    </div>
  </div>
  <misa-confirm-dialog v-if="confirmDialog" v-model="confirmDialog" :title="t('emulationTitle.removeEmulationTitles')" @keydown.enter="deleteRow">
    <template #content>
      <div>
        {{ t('emulationTitle.removeEmulationTitles') }}
        <span style="font-weight: bold">{{
          selectedRow?.emulationTitleName
        }}</span>
        {{t('emulationTitle.selected')}}?
      </div>
    </template>
    <template #button>
      <misa-button type="secondary" @click="closeConfirmDialog"
        >{{ t('reuse.no') }}</misa-button
      >
      <misa-button type="danger" @click="deleteRow">{{ t('emulationTitle.removeEmulationTitle') }}</misa-button>
    </template>
  </misa-confirm-dialog>
</template>

<script>
import {
  formatApplyObject,
  formatCommendationLevel,
  formatMovementType,
  formatStatus,
} from "@/js/format/emulation-title";
import { useEmulationTitleStore } from "@/store/emulationTitle";
import { mapActions, mapState } from "pinia";
export default {
  name: "EmulationTable",
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageIndex: 1,
        total: 20,
      },
      filterValue: {},
      keyword: "",
      id: 999,
      confirmDialog: false,
      showDropdownEdit: false,
      selectedRow: {},
    };
  },
  watch: {
    /**
     * Recalculate the total number of pages in the table
     * @param {*} newValue
     */
    total(newValue) {
      this.pagination.total = newValue;
    },
  },
  computed: {
    /**
     * get table data from EmulationTitleStore
     *    * Created At: 15/05/2023
     * @author NQTruong
     */
    ...mapState(useEmulationTitleStore, {
      table: (store) => {
        return {
          header: store.header,
          data: store.data,
        };
      },
    }),
    ...mapState(useEmulationTitleStore, {
      total: (store) => {
        return store.total;
      },
      ...mapState(useEmulationTitleStore, ["loading"]),
    }),
  },
  /**
   * Tiny emmiter(Eventbus) function
   * Created At: 10/05/2023
   * @author NQTruong
   */
  mounted() {
    this.getAPI({
      pageSize: this.pagination.pageSize,
      pageIndex: this.pagination.pageIndex,
    });
    this.emitter.on("unselect-row-emulation", this.unSelect);
    this.emitter.on("filter-table-emulation", (filterValue) => {
      this.filterTable(filterValue);
    });
    this.emitter.on("search-table-emulation", (keyword) => {
      this.searchTable(keyword);
    });
  },
  emits: ["select", "select-row"],
  methods: {
    /**
     * Toogle the visibility of dorp down to change status
     * Created At: 15/05/2023
     * @author NQTruong
     */
    toogleDropdownEdit() {
      this.showDropdownEdit = !this.showDropdownEdit;
    },
    /**
     * Call change sort API method
     * @param {*} _header header value
     * @param {*} index index : Bumber
     * @param {*} value sort value {true/false}
     * Created At: 15/05/2023
     * @author NQTruong
     */
    changeSort(_header, index, value) {
      this.changeSortStore(index, value);
    },
    /**
     * Open confirm dialog before remove row
     * @param {*} row row data
     * Created At: 15/05/2023
     * @author NQTruong
     */
    openConfirmDialog(row) {
      this.confirmDialog = true;
      this.selectedRow = { ...row };
    },
    /**
     * Close confirm dialog
     * Created At: 15/05/2023
     * @author NQTruong
     */
    closeConfirmDialog() {
      this.confirmDialog = false;
    },
    /**
     * format value to return label for apply object
     * @param {*} value value of apply object
     */
    formatApplyObjectTable(value) {
      return formatApplyObject(value);
    },
    /**
     * format value to return label for Commendation Level
     * @param {*} value value of Commendation Level
     */
    formatCommendationLevelTable(value) {
      return formatCommendationLevel(value);
    },
    /**
     * format value to return label for Movement Type
     * @param {*} value value of Movement Type
     */
    formatMovementTypeTable(value) {
      return formatMovementType(value);
    },
    /**
     * format value to return label for status
     * @param {*} value value of status
     */
    formatStatusTable(value) {
      return formatStatus(value);
    },
    /**
     * Register to use function in EmulationTitleStore
     *    * Created At: 15/05/2023
     * @author NQTruong
     */
    ...mapActions(useEmulationTitleStore, [
      "add",
      "edit",
      "removeRows",
      "getAPI",
      "addAPI",
      "editAPI",
      "deleteAPI",
      "changeSortStore",
      "updateStatusAPI",
    ]),
    /**
     * when change pagination call get api and pass new params
     * @param {*} value object {pageSize : Number, pageIndex: Number}}
     * Created At: 16/05/2023
     * @author NQTruong
     */
    changePagination(value) {
      this.getAPI(value);
    },
    /**
     * send keyword to get api params
     * @param {*} keyword object {keyword: string}
     * Created At: 16/05/2023
     * @author NQTruong
     */
    searchTable(keyword) {
      this.getAPI({ keyword: keyword });
    },
    /**
     * send filterValue to Table component to filter
     * if value is null then remove attribue from object filter
     * @param {*} filterValue
     * Created At: 10/05/2023
     * @author NQTruong
     */
    filterTable(filterValue) {
      this.getAPI(filterValue);
    },
    /**
     * Call api to Remove row
     * @param {*} row row value
     * Created At: 17/05/2023
     * @author NQTruong
     */
    deleteRow() {
      this.deleteAPI(this.selectedRow.emulationTitleID);
      this.closeConfirmDialog();
    },
    /**
     * call unSelectedRows method in Table component
     * Created At: 10/05/2023
     * @author NQTruong
     */
    unSelect() {
      this.$refs.misaTable.unSelectedRows(this.$refs.misaTable.getSelectedRows);
    },
    /**
     * call getSelectedRows function in Table component to get select rows
     * Created At: 10/05/2023
     * @author NQTruong
     */
    selectRow() {
      this.$emit("select", this.$refs.misaTable.getSelectedRows);
    },
    /**
     * pass value to Form
     * @param {*} row
     * Created At: 10/05/2023
     * @author NQTruong
     */
    formEdit(row) {
      this.emitter.emit("toggle-emulation-dialog", true);
      this.$emit("select-row", this.$enum.FormActions.Edit, row);
    },
    changeStatus(row, status) {
      this.updateStatusAPI({
        emulationTitleID: row.emulationTitleID,
        inactive: status,
      });
    },
  },
};
</script>
