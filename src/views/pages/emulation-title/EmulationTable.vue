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
        <template #ApplyObject="row">
          <div>
            {{ formatApplyObjectTable(row.ApplyObject) }}
          </div>
        </template>
        <template #CommendationLevel="row">
          <div>
            {{ formatCommendationLevelTable(row.CommendationLevel) }}
          </div>
        </template>
        <template #MovementType="row">
          <div>
            {{ formatMovementTypeTable(row.MovementType) }}
          </div>
        </template>
        <template #Inactive="row">
          <div class="flex items-center gap-4px">
            <div :class="formatStatusTable(row.Inactive).class"></div>
            <div>
              {{ formatStatusTable(row.Inactive).label }}
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
export default {
  name: "EmulationTable",
  data() {
    return {
      table: {
        header: [
          {
            label: "Tên danh hiệu thi đua",
            prop: "EmulationTitleName",
            width: "30%",
          },
          { label: "Mã danh hiệu", prop: "EmulationTitleCode", width: "15%" },
          {
            label: "Đối tượng khen thưởng",
            prop: "ApplyObject",
            width: "15%",
            slot: true,
          },
          {
            label: "Cấp khen thưởng",
            prop: "CommendationLevel",
            width: "15%",
            slot: true,
          },
          {
            label: "Loại phong trào",
            prop: "MovementType",
            width: "15%",
            slot: true,
          },
          { label: "Trạng thái", prop: "Inactive", width: "15%", slot: true },
        ],
        data: [
          {
            EmulationTitleName: "Lao động tiên tiến",
            EmulationTitleCode: "LĐTTCX",
            ApplyObject: 2,
            CommendationLevel: 3,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 50,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Chiến sĩ thi đua cơ sở",
            EmulationTitleCode: "CSTĐCS",
            ApplyObject: 2,
            CommendationLevel: 2,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 48,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Lao động tiên tiến",
            EmulationTitleCode: "LĐTTCH",
            ApplyObject: 2,
            CommendationLevel: 2,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 49,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Chiến sĩ thi đua cấp bộ",
            EmulationTitleCode: "CSTĐCB",
            ApplyObject: 2,
            CommendationLevel: 1,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 46,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Chiến sĩ thi đua cấp tỉnh",
            EmulationTitleCode: "CSTĐCT",
            ApplyObject: 2,
            CommendationLevel: 1,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 47,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "a",
            EmulationTitleCode: "A",
            ApplyObject: 2,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 61,
            IsSystem: 0,
          },
          {
            EmulationTitleName: "Chiến sĩ thi đua toàn quốc",
            EmulationTitleCode: "CSTĐTQ",
            ApplyObject: 2,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 45,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "ds",
            EmulationTitleCode: "D",
            ApplyObject: 2,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 63,
            IsSystem: 0,
          },
          {
            EmulationTitleName: "l d t t c x",
            EmulationTitleCode: "LDTTCX",
            ApplyObject: 2,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 57,
            IsSystem: 0,
          },
          {
            EmulationTitleName: "sda",
            EmulationTitleCode: "LĐTT",
            ApplyObject: 2,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 65,
            IsSystem: 0,
          },
          {
            EmulationTitleName: "Tập thể lao động tiên tiến",
            EmulationTitleCode: "TTLĐTT",
            ApplyObject: 1,
            CommendationLevel: 2,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 55,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Cờ thi đua cấp bộ",
            EmulationTitleCode: "CTĐCB",
            ApplyObject: 1,
            CommendationLevel: 1,
            MovementType: -1,
            Inactive: 0,
            EmulationTitleID: 52,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Cờ thi đua cấp tỉnh",
            EmulationTitleCode: "CTĐCT",
            ApplyObject: 1,
            CommendationLevel: 1,
            MovementType: -1,
            Inactive: 0,
            EmulationTitleID: 53,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "Tập thể lao động xuất sắc",
            EmulationTitleCode: "TTLĐXS",
            ApplyObject: 1,
            CommendationLevel: 1,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 54,
            IsSystem: 1,
          },
          {
            EmulationTitleName: "tẻwr343gdsgd",
            EmulationTitleCode: "Tfdgsd",
            ApplyObject: 1,
            CommendationLevel: 0,
            MovementType: 0,
            Inactive: 0,
            EmulationTitleID: 59,
            IsSystem: 0,
          },
                    {
                        "EmulationTitleName": "Cờ thi đua của Chính phủ",
                        "EmulationTitleCode": "CTĐCP",
                        "ApplyObject": 1,
                        "CommendationLevel": 0,
                        "MovementType": -1,
                        "Inactive": 1,
                        "EmulationTitleID": 51,
                        "IsSystem": 1
                    },
                    {
                        "EmulationTitleName": "Cờ thi đua của Chính phủ",
                        "EmulationTitleCode": "CTĐCP",
                        "ApplyObject": 1,
                        "CommendationLevel": 0,
                        "MovementType": -1,
                        "Inactive": 1,
                        "EmulationTitleID": 51,
                        "IsSystem": 1
                    },
                    {
                        "EmulationTitleName": "Cờ thi đua của Chính phủ",
                        "EmulationTitleCode": "CTĐCP",
                        "ApplyObject": 1,
                        "CommendationLevel": 0,
                        "MovementType": -1,
                        "Inactive": 1,
                        "EmulationTitleID": 51,
                        "IsSystem": 1
                    },
                    {
                        "EmulationTitleName": "Cờ thi đua của Chính phủ",
                        "EmulationTitleCode": "CTĐCP",
                        "ApplyObject": 1,
                        "CommendationLevel": 0,
                        "MovementType": -1,
                        "Inactive": 1,
                        "EmulationTitleID": 51,
                        "IsSystem": 1
                    },
          {
            EmulationTitleName: "Cờ thi đua của Chính phủ",
            EmulationTitleCode: "CTĐCP",
            ApplyObject: 1,
            CommendationLevel: 0,
            MovementType: -1,
            Inactive: 1,
            EmulationTitleID: 51,
            IsSystem: 1,
          },
        ],
      },
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
    /**
     * Recalculate the total Count of the table
     *      * Created At: 10/05/2023
     * @author QTNgo
     */
    table: {
      handler() {
        this.pagination.total = this.table.data.length;
      },
      deep: true,
    },
  },
  /**
   * Tiny emmiter(Eventbus) function
   * Created At: 10/05/2023
   * @author QTNgo
   */
  mounted() {
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
    formatApplyObjectTable(value) {
      return formatApplyObject(value);
    },
    formatCommendationLevelTable(value) {
      return formatCommendationLevel(value);
    },
    formatMovementTypeTable(value) {
      return formatMovementType(value);
    },
    formatStatusTable(value) {
      return formatStatus(value);
    },
    /**
     * Add value at the top of the table
     * @param {*} form value get from Form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    addEmulationTable(form) {
      const row = { EmulationTitleID: this.id++, ...form };
      this.table.data.unshift(row);
    },
    /**
     * edit value at the top of the table
     * @param {*} form value get from Form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    editEmulationTable(form) {
      const findIndex = this.table.data.findIndex(
        (row) => row.EmulationTitleID == form.EmulationTitleID
      );
      this.table.data[findIndex] = { ...this.table.data[findIndex], ...form };
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
      this.table.data = this.table.data.filter(
        (tableRow) => !this.$refs.misaTable.getSelectedRows.includes(tableRow)
      );
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
