<template>
  <div class="main__body">
    <div class="main__body-table">
      <misa-table
        v-model="table"
        checkbox
        :pagination="pagination"
        :filterValue="filterValue"
        :keyword="keyword"
        ref="misaTable"
        @select="selectRow"
        @dbclick-row="formEdit"
      >
        <template #applyObject="row">
          <div>
            {{ formatApplyObjectTable(row.applyObject) }}
          </div>
        </template>
        <template #commendationLevel="row">
          <div>
            {{ formatCommendationLevelTable(row.commendationLevel) }}
          </div>
        </template>
        <template #movementType="row">
          <div>
            {{ formatMovementTypeTable(row.movementType) }}
          </div>
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
            <div class="tooltip">
              <div class="icon__pencil"></div>
              <span class="tooltiptext tooltiptext-top">{{
                t("reuse.edit")
              }}</span>
            </div>
          </div>
          <div class="button-icon-table">
            <misa-dropdown :header="false" position="right">
              <template #click>
                <div class="tooltip flex items-center h-full">
                  <div class="icon__threedots"></div>
                  <span class="tooltiptext tooltiptext-top dropdown"
                    >{{ t("reuse.more") }}...</span
                  >
                </div>
              </template>
              <template #content>
                <a class="content-disabled" @click="changeStatus(row, 1)">{{
                  t("reuse.using")
                }}</a>
                <a @click="changeStatus(row, 2)">{{ t("reuse.shutdown") }}</a>
                <a class="content-red" @click="changeStatus(row, 3)">{{
                  t("reuse.remove")
                }}</a>
              </template>
            </misa-dropdown>
          </div>
        </template>
      </misa-table>
    </div>
  </div>
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
    };
  },
  watch: {
    total(newValue){
      this.pagination.total = newValue
    }
  },
  computed: {
    /**
     * get table data from EmulationTitleStore
     *    * Created At: 15/05/2023
     * @author QTNgo
     */
    ...mapState(useEmulationTitleStore, {
      table: (store) => {
        return {
          header: [
            {
              label: "Tên danh hiệu thi đua",
              prop: "emulationTitleName",
              width: "30%",
            },
            { label: "Mã danh hiệu", prop: "emulationTitleCode", width: "15%" },
            {
              label: "Đối tượng khen thưởng",
              prop: "applyObject",
              width: "15%",
              slot: true,
            },
            {
              label: "Cấp khen thưởng",
              prop: "commendationLevel",
              width: "15%",
              slot: true,
            },
            {
              label: "Loại phong trào",
              prop: "movementType",
              width: "15%",
              slot: true,
            },
            { label: "Trạng thái", prop: "inactive", width: "15%", slot: true },
          ],
          data: store.data,
        };
      },
    }),
    ...mapState(useEmulationTitleStore, {
      total: (store) => {
        return store.pagination.total;
      },
    }),
  },
  /**
   * Tiny emmiter(Eventbus) function
   * Created At: 10/05/2023
   * @author QTNgo
   */
  mounted() {
    this.getAPI();
    this.emitter.on("remove-row-emulation", this.removeRow);
    this.emitter.on("unselect-row-emulation", this.unSelect);
    this.emitter.on("filter-table-emulation", (filterValue) => {
      this.filterTable(filterValue);
    });
    this.emitter.on("search-table-emulation", (keyword) => {
      this.searchTable(keyword);
    });
    this.emitter.on("add-table-emulation", (row) => {
      this.addEmulationTable(row);
    });
    this.emitter.on("edit-table-emulation", (row) => {
      this.editEmulationTable(row);
    });
  },
  emits: ["select", "select-row"],
  methods: {
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
     * @author QTNgo
     */
    ...mapActions(useEmulationTitleStore, [
      "add",
      "edit",
      "removeRows",
      "getAPI",
      "addAPI",
      "editAPI",
      "deleteAPI"
    ]),
    /**
     * Add value at the top of the table
     * @param {*} form value get from Form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    addEmulationTable(form) {
      this.addAPI(form).then((res)=>{
        if(res){
        this.getAPI()}
      });
    },
    /**
     * edit value at the top of the table
     * @param {*} form value get from Form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    editEmulationTable(form) {
      this.editAPI(form).then((res)=>{
        if(res){
        this.getAPI()}
      });
    },
    /**
     * send keyword to Table component to filter
     * @param {*} keyword
     * Created At: 10/05/2023
     * @author QTNgo
     */
    searchTable(keyword) {
      this.keyword = keyword;
    },
    /**
     * send filterValue to Table component to filter
     * if value is null then remove attribue from object filter
     * @param {*} filterValue
     * Created At: 10/05/2023
     * @author QTNgo
     */
    filterTable(filterValue) {
      for (const key in filterValue) {
        if (filterValue[key] !== null) {
          this.filterValue[key] = filterValue[key];
        } else {
          delete this.filterValue[key];
        }
      }
    },
    /**
     * call unSelectedRows method in Table component
     * Created At: 10/05/2023
     * @author QTNgo
     */
    unSelect() {
      this.$refs.misaTable.unSelectedRows(this.$refs.misaTable.getSelectedRows);
    },
    /**
     * Remove rows if selected
     * Created At: 10/05/2023
     * @author QTNgo
     */
    removeRow() {
      this.removeRows(this.$refs.misaTable.getSelectedRows);
    },
    /**
     * call getSelectedRows function in Table component to get select rows
     * Created At: 10/05/2023
     * @author QTNgo
     */
    selectRow() {
      this.$emit("select", this.$refs.misaTable.getSelectedRows);
    },
    /**
     * pass value to Form
     * @param {*} row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    formEdit(row) {
      this.emitter.emit("toggle-emulation-dialog", true);
      this.$emit("select-row", this.$enum.FormActions.Edit, row);
    },
    //TODO: Change value status
    changeStatus(row, status) {
      console.log("row: ", row, status);
    },
  },
};
</script>
