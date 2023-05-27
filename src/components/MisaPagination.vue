<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex" style="justify-content: space-between; align-items: center">
    <div>
      Tổng số: <span style="font-weight: 700">{{ pagination.total }}</span> bản
      ghi
    </div>
    <div class="flex" style="gap: 10px">
      <div class="flex items-center">Số bản ghi/trang</div>
      <div style="width: 100px">
        <misa-combobox
          v-model="pagination.pageSize"
          :options="paginationOptions"
          position="top"
        ></misa-combobox>
      </div>
      <div class="flex items-center">
        <span style="font-weight: 700; padding-right: 4px"
          >{{ startIndex + 1 }} - {{ endIndex - 1 }}</span
        >
        bản ghi
      </div>
      <div class="flex items-center">
        <misa-button type="secondary-noborder" :class="previousPage" @click="prev">
          <div class="icon__leftarrow" :class="previousPage"></div>
        </misa-button>
      </div>
      <div class="flex items-center">
        <misa-button type="secondary-noborder" :class="nextPage" @click="next">
          <div class="icon__rightarrow" :class="nextPage"></div>
        </misa-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MisaPagination",
  data() {
    return {
      paginationOptions: [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
      ],
    };
  },
  props: {
    pagination: {
      type: Object,
      description: "{pageSize: Number, pageIndex: Number, total: Number}",
    },
    startIndex: {
      type: Number,
      default: 0,
      description: "start index of pagination",
    },
    endIndex: {
      type: Number,
      default: 11,
      description: "end index of pagination",
    },
  },
  computed: {
    /**
     * Change class to disabled if there is no previous page
     * CreatedBy : QTNgo (16/06/2023)
     */
    previousPage() {
      if (this.startIndex > 0) {
        return "";
      }
      return "disabled";
    },
    /**
     * Change class to disabled if there is no next page
     * CreatedBy : QTNgo (16/06/2023)
     */
    nextPage() {
      if (this.endIndex <= this.pagination.total) {
        return "";
      }
      return "disabled";
    },
  },
  emits: ["change-value"],
  watch: {
    /**
     * Emit event when pageSize changes
     * CreatedBy : QTNgo (16/06/2023)
     */
    "pagination.pageSize"(val) {
      this.$emit("change-value", { pageSize: val });
    },
    /**
     * Emit event when pageIndex changes
     * CreatedBy : QTNgo (16/06/2023)
     */
    "pagination.pageIndex"(val) {
      this.$emit("change-value", { pageIndex: val });
    },
  },
  methods: {
    /**
     * click previous page
     * CreatedBy : QTNgo (16/06/2023)
     */
    prev() {
      if (this.previousPage == "") {
        // eslint-disable-next-line vue/no-mutating-props
        this.pagination.pageIndex--;
      }
    },
    /**
     * click next page
     * CreatedBy : QTNgo (16/06/2023)
     */
    next() {
      if (this.nextPage == "") {
    // eslint-disable-next-line vue/no-mutating-props
        this.pagination.pageIndex++;
      }
    },
  },
};
</script>
