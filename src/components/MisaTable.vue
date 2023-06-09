<template>
  <div class="table-container" ref="tableScreen">
    <table aria-describedby="table">
      <thead class="table__header">
        <tr>
          <th class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="headerBox" @click-box="checkAll" />
          </th>
          <th
            v-for="(header, index) in modelValue.header"
            :key="index"
            :style="{ minWidth: header?.minWidth, width: header?.width }"
            class="cursor-pointer"
            @click="changeSort(header, index)"
          >
            <div class="flex items-center">
              <div class="table__header-title">{{ header?.label }}</div>
              <div
                data-v-6467733b=""
                class="ml-4 icon-sort"
                :class="header?.sort ? 'asc' : 'desc'"
                v-if="header?.sort == true || header?.sort == false"
              ></div>
            </div>
          </th>
          <th class="hidden-column"></th>
        </tr>
      </thead>
      <misa-loading
        v-if="loading"
        :modelValue="loading"
        style="height: 80%"
      ></misa-loading>
      <tbody v-else>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @mouseenter="hover"
          :class="row.select ? 'selected' : ''"
        >
          <td class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox
              v-model="row.select"
              @click-box="(value) => checkBoxRow(value, index)"
            />
          </td>
          <td
            v-for="(header, index) in modelValue.header"
            :key="index"
            @dblclick="dbClickRow(row)"
          >
            <div v-if="header?.slot" class="hide-text">
              <slot :name="header?.prop" v-bind="row"></slot>
            </div>
            <div class="hide-text" v-else :title="row[header?.prop]">
              {{ row[header?.prop] }}
            </div>
          </td>
          <div class="button__table operator">
            <slot name="operator" v-bind="row" />
          </div>
        </tr>
        <div v-if="tableData.length <= 0 && !loading" class="table-nodata">
          Không có dữ liệu
        </div>
      </tbody>
    </table>
  </div>
  <div class="pagination">
    <misa-pagination
      v-if="pagination"
      :pagination="pagination"
      :startIndex="startIndex"
      :endIndex="endIndex"
      @change-value="changePagination"
    ></misa-pagination>
  </div>
</template>

<script>
export default {
  expose: ["getSelectedRows", "unSelectedRows", "filterTable"],
  name: "MisaTable",
  data() {
    return {
      checkBoxes: 0,
      headerBox: false,
      left: "80%",
      selectedRows: [],
    };
  },
  props: {
    modelValue: {
      type: Object,
      description:
        "{header:{prop:string,label:string,sort?:boolean,width:string},data:[{}]}",
    },
    checkbox: {
      type: Boolean,
      default: false,
      description: "show checkbox or not",
    },
    pagination: {
      type: Object,
      default: () => {},
      description: "show pagination",
    },
    filterValue: {
      type: Object,
      default: () => {},
      description: "filter value",
    },
    keyword: {
      type: String,
      default: "",
      description: "keyword to filter",
    },
    filterApi: {
      type: Boolean,
      default: false,
      description:
        "if(true) it will not filter locally, it will send value to api",
    },
    loading: {
      type: Boolean,
      default: false,
      description: "show loading icon in the table",
    },
  },
  watch: {
    /**
     * This code checks the value of newValue and sets the value of headerBox accordingly.
     * If newValue is equal to the length of modelValue.data , then headerBox is set to true.
     * If newValue is equal to 0, headerBox is set to false. Otherwise, headerBox is set to 'half'.
     * @param {*} newValue
     * Created At: 10/05/2023
     * @author NQTruong
     */
    checkBoxes(newValue) {
      this.$emit("select");
      if (newValue == this.tableData.length) {
        this.headerBox = true;
        return;
      }
      if (newValue == 0) {
        this.headerBox = false;
      } else {
        this.headerBox = "half";
      }
    },
  },
  emits: [
    "update:modelValue",
    "select",
    "dbclick-row",
    "change-pagination",
    "change-sort",
  ],
  computed: {
    /**
     * return selected rows
     * Created At: 10/05/2023
     * @author NQTruong
     */
    getSelectedRows() {
      if(!this.selectedRows){
        return []
      }
      return this.selectedRows;
    },
    /**
     * Filter table data base on keyword or filter or pagination
     * Created At: 10/05/2023
     * @author NQTruong
     */
    tableData() {
      let table = this.modelValue.data.map((a) => {
        return { ...a };
      });
      if (!this.filterApi) {
        if (this.pagination) {
          table = this.modelValue.data?.slice(this.startIndex, this.endIndex);
        }
        if (this.filterValue) {
          table = table?.filter((row) =>
            Object.keys(this.filterValue).every((key) =>
              this.filterValue[key] ? row[key] === this.filterValue[key] : true
            )
          );
        }
        if (this.keyword) {
          table = table?.filter((row) =>
            Object.keys(row).some((key) =>
              typeof row[key] == "string"
                ? row[key].includes(this.keyword)
                : false
            )
          );
        }
      }
      if (this.checkbox) {
        let checkboxLength = 0;
        table.forEach((tableRow) => {
          const found = this.selectedRows.find(
            (selectedRow) =>
              JSON.stringify(selectedRow) === JSON.stringify(tableRow)
          );
          if (found) {
            checkboxLength++;
            tableRow.select = true;
          }
          this.checkBoxes = checkboxLength;
          if (checkboxLength == table.length && checkboxLength !== 0) {
            this.headerBox = true;
          } else {
            this.headerBox = false;
          }
        });
      }

      return table;
    },
    /**
     * calculate the startIndex
     * Created At: 10/05/2023
     * @author NQTruong
     */
    startIndex() {
      return (this.pagination.pageIndex - 1) * this.pagination.pageSize;
    },
    /**
     * calculate the endIndex
     * Created At: 10/05/2023
     * @author NQTruong
     */
    endIndex() {
      return this.pagination.pageIndex * this.pagination.pageSize + 1;
    },
  },
  methods: {
    /**
     * Thay đổi dữ liệu của check header box
     * @param {*} checkbox
     * Created At: 10/05/2023
     * @author NQTruong
     */
    changeHeaderBox(checkbox) {
      this.checkBoxes = checkbox;
      if (checkbox == this.tableData.length && checkbox !== 0) {
        this.headerBox = true;
      } else {
        this.headerBox = false;
      }
    },
    /**
     * Change sort value
     * @param {*} header header value
     * @param {*} index index of header
     * Created At: 15/05/2023
     * @author NQTruong
     */
    changeSort(header, index) {
      let value = true;
      switch (header.sort) {
        case true:
          value = false;
          break;
        case false:
          value = null;
          break;
        default:
          break;
      }
      this.$emit("change-sort", header, index, value);
    },
    /**
     * Show the button float when hover the table
     * Set the LEFT: VALUE
     * Created At: 15/05/2023
     * @author NQTruong
     */
    hover() {
      this.left = `${
        this.$refs.tableScreen.offsetWidth +
        this.$refs.tableScreen.scrollLeft -
        120
      }px`;
    },
    /**
     * Change pagination value
     * @param {*} value {pageSize: Number, pageIndex: Number}
     * Created At: 15/05/2023
     * @author NQTruong
     */
    changePagination(value) {
      this.$emit("change-pagination", value);
    },
    /**
     * set value when click checkbox
     * decreased if unchecked
     * increased if checked
     * @param {*} value
     * Created At: 10/05/2023
     * @author NQTruong
     */
    checkBoxRow(value, index) {
      if (value) {
        this.selectedRows.push({ ...this.modelValue.data[index] });
        this.checkBoxes++;
      } else {
        this.selectedRows = this.selectedRows.filter(
          (row) =>
            JSON.stringify(row) != JSON.stringify(this.modelValue.data[index])
        );
        this.checkBoxes--;
      }
    },
    /**
     * used to check or uncheck all checkboxes in the modelValue.data array.
     * Created At: 10/05/2023
     * @author NQTruong
     */
    checkAll() {
      if (this.checkBoxes == 0) {
        this.tableData.forEach((row, index) => {
          row.select = true;
          this.checkBoxRow(true, index);
          this.checkBoxes = this.tableData.length;
        });
      } else {
        this.tableData.forEach((row, index) => {
          row.select = false;
          this.checkBoxRow(false, index);
          this.checkBoxes = 0;
        });
      }
    },
    /**
     * emits event double click
     * @param {*} row
     * Created At: 10/05/2023
     * @author NQTruong
     */
    dbClickRow(row) {
      this.$emit("dbclick-row", row);
    },
    /**
     * set rows to  unchecked
     * @param {*} rows
     * Created At: 10/05/2023
     * @author NQTruong
     */
    unSelectedRows() {
      this.checkBoxes = 0;
      this.selectedRows = [];
    },
  },
};
</script>
<style scoped>
.operator {
  left: v-bind(left);
}
</style>
