<template>
  <div class=".table-overflow-auto">
    <table aria-describedby="table">
      <thead class="table__header">
        <tr>
          <th class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="headerBox" @click-box="checkAll" />
          </th>
          <th
            v-for="(header, index) in modelValue.header"
            :key="index"
            :style="{ width: header.width }"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @dblclick="dbClickRow(row)"
        >
          <td class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox
              v-model="row.select"
              @click-box="checkBoxRow(value)"
            />
          </td>
          <td v-for="(header, index) in modelValue.header" :key="index">
            <slot :name="header.prop" v-bind="row" v-if="header.slot" />
            <div v-else>{{ row[header.prop] }}</div>
          </td>
          <div class="button__table">
            <slot name="operator" v-bind="row" />
          </div>
        </tr>
      </tbody>
    </table>
  </div>
  <misa-pagination
    v-if="pagination"
    :pagination="pagination"
    :startIndex="startIndex"
    :endIndex="endIndex"
  ></misa-pagination>
</template>

<script>
export default {
  expose: ["getSelectedRows", "unSelectedRows", "filterTable"],
  name: "MisaTable",
  data() {
    return {
      checkBoxes: 0,
      headerBox: false,
      headerArray: [],
      loading: false,
    };
  },
  props: {
    modelValue: {
      type: Object,
    },
    checkbox: {
      type: Boolean,
      default: false,
      description: "show checkbox or not",
    },
    pagination: {
      type: Object,
      default: () => {},
    },
    filterValue: {
      type: Object,
      default: () => {},
    },
    keyword: {
      type: String,
      default: "",
    }
  },
  watch: {
    /**
     * This code checks the value of newValue and sets the value of headerBox accordingly.
     * If newValue is equal to the length of modelValue.data , then headerBox is set to true.
     * If newValue is equal to 0, headerBox is set to false. Otherwise, headerBox is set to 'half'.
     * @param {*} newValue
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
  emits: ["update:modelValue", "select", "dbclick-row"],
  computed: {
    /**
     * return selected rows
     */
    getSelectedRows() {
      return this.modelValue.data.filter((row) => row.select);
    },
    /**
     * Filter table data base on keyword or filter or pagination
     */
    tableData() {
      let table = this.modelValue;
      if (this.pagination) {
        table = this.modelValue.data.slice(this.startIndex, this.endIndex);
      }
      if (this.filterValue) {
        table = this.modelValue.data.filter((row) =>
          Object.keys(this.filterValue).every((key) =>
            this.filterValue[key] ? row[key] === this.filterValue[key] : true
          )
        );
      }
      if (this.keyword) {
        table = this.modelValue.data.filter((row) =>
          Object.keys(row).some((key) =>
            typeof row[key] == "string"
              ? row[key].includes(this.keyword)
              : false
          )
        );
      }
      return table;
    },
    /**
     * calculate the startIndex
     */
    startIndex() {
      return (this.pagination.pageIndex - 1) * this.pagination.pageSize;
    },
    /**
     * calculate the endIndex
     */
    endIndex() {
      return this.pagination.pageIndex * this.pagination.pageSize + 1;
    },
  },
  methods: {
    updateValue() {
      this.$emit("update:modelValue", !this.modelValue);
    },
    checkBoxRow(value) {
      if (value) {
        this.checkBoxes++;
      } else {
        this.checkBoxes--;
      }
    },
    /**
     * used to check or uncheck all checkboxes in the modelValue.data array.
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
     */
    dbClickRow(row) {
      this.$emit("dbclick-row", row);
    },
    /**
     * set rows to  unchecked
     * @param {*} rows
     */
    unSelectedRows(rows) {
      console.log("rows", rows);
      this.modelValue.data.forEach((row) => {
        if (rows.includes(row)) {
          row.select = false;
        }
      });
    },
  },
};
</script>

