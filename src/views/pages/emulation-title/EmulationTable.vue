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
  <misa-confirm-dialog v-model="confirmDialog" title="Xóa Danh hiệu thi đua">
    <template #content>
      <div>
        Xóa danh hiệu thi đua <span style="font-weight: bold;">{{selectedRow?.emulationTitleName}}</span>   đã chọn?
      </div>
    </template>
    <template #button>
      <misa-button type="secondary" @click="closeConfirmDialog">Không</misa-button>
      <misa-button type="danger" @click="deleteRow">Xóa danh hiệu</misa-button>
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
      selectedRow: {}
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
        return store.total;
      },
      ...mapState(useEmulationTitleStore, ['loading']),
    }),
  },
  /**
   * Tiny emmiter(Eventbus) function
   * Created At: 10/05/2023
   * @author QTNgo
   */
  mounted() {
    this.getAPI({pageSize: this.pagination.pageSize, pageIndex: this.pagination.pageIndex})
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
    openConfirmDialog(row){
      this.confirmDialog = true
      this.selectedRow = {...row}
    },
    closeConfirmDialog(){
      this.confirmDialog = false
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
     * @author QTNgo
     */
    ...mapActions(useEmulationTitleStore, [
      "add",
      "edit",
      "removeRows",
      "getAPI",
      "addAPI",
      "editAPI",
      "deleteAPI",
      "deleteMultipleAPI"
    ]),
    /**
     * Call api POST
     * @param {*} form value get from Form
     * Created At: 16/05/2023
     * @author QTNgo
     */
    addEmulationTable(form) {
      this.addAPI(form).then((res)=>{
        if(res){
        this.getAPI()}
      });
    },
    /**
     * call api PUT
     * @param {*} form value get from Form
     * Created At: 16/05/2023
     * @author QTNgo
     */
    editEmulationTable(form) {
      this.editAPI(form);
    },
    /**
     * when change pagination call get api and pass new params
     * @param {*} value object {pageSize : Number, pageIndex: Number}}
     * Created At: 16/05/2023
     * @author QTNgo
     */
    changePagination(value){
      this.getAPI(value);
    },
    /**
     * send keyword to get api params
     * @param {*} keyword object {keyword: string}
     * Created At: 16/05/2023
     * @author QTNgo
     */
    searchTable(keyword) {
      this.getAPI({keyword: keyword});
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
      this.getAPI(this.filterValue)
    },
    /**
     * Call api to Remove row
     * @param {*} row row value 
     * Created At: 17/05/2023
     * @author QTNgo
     */
    deleteRow(){
      this.deleteAPI({id: this.selectedRow.emulationTitleID})
      this.closeConfirmDialog()
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
      const listId = this.$refs.misaTable.getSelectedRows.map(row=> row.emulationTitleID)
      this.deleteMultipleAPI({id:listId})
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
