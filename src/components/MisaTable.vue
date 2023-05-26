<template>
  <div class="table-container" ref="tableScreen">
    <table aria-describedby="table" >
      <thead class="table__header">
        <tr>
          <th class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="headerBox" @click-box="checkAll" />
          </th>
          <th
            v-for="(header, index) in modelValue.header"
            :key="index"
            :style="{ minWidth: header?.width }"
            class="cursor-pointer"
            @click="changeSort(header, index)"
          >
          <div class="flex items-center">
            <div style="text-align: left;">{{ header?.label }}</div>
            <div data-v-6467733b="" class="ml-4 icon-sort" :class="header?.sort ? 'asc' : 'desc'" v-if="header?.sort == true || header?.sort == false"></div>
          </div>
          </th>
        </tr>
      </thead>
      <tbody >
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @mouseenter="hover"
          :class="row.select ? 'selected' : ''"
        >
          <td class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox
              v-model="row.select"
              @click-box="checkBoxRow(value)"
            />
          </td>
          <td v-for="(header, index) in modelValue.header" :key="index"
          @dblclick="dbClickRow(row)"
          >
            <slot :name="header?.prop" v-bind="row" v-if="header?.slot" />
            <div v-else>{{ row[header?.prop] }}</div>
          </td>
          <div class="button__table operator">
            <slot name="operator" v-bind="row" />
          </div>
        </tr>
      <div v-if="tableData.length <= 0 && !loading" class="table-nodata">Không có dữ liệu</div>
      </tbody>
    </table>
  <misa-loading :modelValue="loading"></misa-loading>
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
    };
  },
  props: {
    modelValue: {
      type: Object,
      description: '{header:{prop:string,label:string,sort?:boolean,width:string},data:[{}]}'
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
      description: "if(true) it will not filter locally, it will send value to api",
    },
    loading:{
      type: Boolean,
      default: false,
      description: "show loading icon in the table",
    }
  },
  watch: {
    /**
     * This code checks the value of newValue and sets the value of headerBox accordingly.
     * If newValue is equal to the length of modelValue.data , then headerBox is set to true.
     * If newValue is equal to 0, headerBox is set to false. Otherwise, headerBox is set to 'half'.
     * @param {*} newValue
     * Created At: 10/05/2023
     * @author QTNgo
     */
    checkBoxes(newValue) {
      this.$emit("select");
      if (newValue == this.modelValue.data.length) {
        this.headerBox = true;
        return;
      }
      if (newValue == 0) {
        this.headerBox = false;
      } else {
        this.headerBox = "half";
      }
    },
    /**
     * Get box that has been selected in the table
     * Created At: 10/05/2023
     * @author QTNgo
     */
    modelValue: {
      handler() {
        this.checkBoxes = this.modelValue.data.filter(
          (row) => row.select
        ).length;
      },
      deep: true,
    },

  },
  emits: ["update:modelValue", "select", "dbclick-row", "change-pagination","change-sort"],
  computed: {
    /**
     * return selected rows
     * Created At: 10/05/2023
     * @author QTNgo
     */
    getSelectedRows() {
      return this.modelValue.data.filter((row) => row.select);
    },
    /**
     * Filter table data base on keyword or filter or pagination
     * Created At: 10/05/2023
     * @author QTNgo
     */
    tableData() {
      let table = this.modelValue.data;
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
      return table;
    },
    /**
     * calculate the startIndex
     * Created At: 10/05/2023
     * @author QTNgo
     */
    startIndex() {
      return (this.pagination.pageIndex - 1) * this.pagination.pageSize;
    },
    /**
     * calculate the endIndex
     * Created At: 10/05/2023
     * @author QTNgo
     */
    endIndex() {
      return this.pagination.pageIndex * this.pagination.pageSize + 1;
    },
  },
  methods: {
    /**
     * Change sort value
     * @param {*} header header value
     * @param {*} index index of header
     * Created At: 15/05/2023
     * @author QTNgo
     */
    changeSort(header,index){
      const value = header.sort === true ? false : (header?.sort == false ? null : true);
      this.$emit("change-sort", header,index, value);
    },
    /**
     * Show the button float when hover the table
     * Set the LEFT: VALUE
     * Created At: 15/05/2023
     * @author QTNgo
     */
    hover(){
      this.left = `${this.$refs.tableScreen.offsetWidth + this.$refs.tableScreen.scrollLeft - 100}px`
    },
        /**
     * Change pagination value
     * @param {*} value {pageSize: Number, pageIndex: Number}
     * Created At: 15/05/2023
     * @author QTNgo
     */
    changePagination(value) {
      this.$emit("change-pagination", value);
    },
    /**
     * 2-ways binding
     * Created At: 15/05/2023
     * @author QTNgo
     */
    updateValue() {
      this.$emit("update:modelValue", !this.modelValue);
    },
    /**
     * set value when click checkbox
     * decreased if unchecked
     * increased if checked
     * @param {*} value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    checkBoxRow(value) {
      if (value) {
        this.checkBoxes++;
      } else {
        this.checkBoxes--;
      }
    },
    /**
     * used to check or uncheck all checkboxes in the modelValue.data array.
     * Created At: 10/05/2023
     * @author QTNgo
     */
    checkAll() {
      if (this.checkBoxes == 0) {
        this.modelValue.data.forEach((row) => {
          row.select = true;
          this.checkBoxes = this.modelValue.data.length;
        });
      } else {
        this.modelValue.data.forEach((row) => {
          row.select = false;
          this.checkBoxes = 0;
        });
      }
    },
    /**
     * emits event double click
     * @param {*} row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    dbClickRow(row) {
      this.$emit("dbclick-row", row);
    },
    /**
     * set rows to  unchecked
     * @param {*} rows
     * Created At: 10/05/2023
     * @author QTNgo
     */
    unSelectedRows(rows) {
      this.modelValue.data.forEach((row) => {
        if (rows.includes(row)) {
          row.select = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.operator{
  left: v-bind(left);

}
</style>