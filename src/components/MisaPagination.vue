<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex" style="justify-content: space-between;align-items: center;">
    <div>Tổng số: <span style="font-weight: 700;">{{ pagination.total }}</span> bản ghi</div>
    <div class="flex" style="gap:10px">
      <div class="flex items-center">Số bản ghi/trang</div>
      <div style="width: 100px;">
        <misa-combobox v-model="pagination.pageSize" :options="paginationOptions" position="top"></misa-combobox>
      </div>
      <div class="flex items-center"><span style="font-weight: 700; padding-right:4px">{{ startIndex + 1 }} - {{ endIndex
        - 1 }}</span> bản ghi</div>
      <div class="flex items-center">
        <div class="icon__leftarrow" :class="previousPage" @click="prev"></div>
      </div>
      <div class="flex items-center">
        <div class="icon__rightarrow" :class="nextPage" @click="next">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MisaPagination',
  data() {
    return {
      paginationOptions: [{ value: 10, label: 10 }, { value: 20, label: 20 }, { value: 50, label: 50 }, { value: 100, label: 100 }]
    }
  },
  props: {
    pagination: {
      type: Object
    },
    startIndex: {
      type: Number,
      default: 0
    },
    endIndex: {
      type: Number,
      default: 11
    }
  },
  computed: {
    previousPage() {
      if (this.startIndex > 0) {
        return ''
      }
      return 'disabled'
    },
    nextPage() {
      if (this.endIndex  <= this.pagination.total) {
        return ''
      }
      return 'disabled'
    },
  },
  emits:['change-value'],
  watch: {
    pagination: {
     handler(val){
      this.$emit('change-value', val)
     },
     deep: true
  }
  },
  methods: {
    // eslint-disable-next-line vue/no-mutating-props
    prev() { if (this.previousPage == '') { this.pagination.pageIndex-- } },
    // eslint-disable-next-line vue/no-mutating-props
    next() { if (this.nextPage == '') { this.pagination.pageIndex++ } }
  },
}
</script>