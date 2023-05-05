<template>
  <div class="flex" style="justify-content: space-between;align-items: center;">
    <div>Tổng số: <span style="font-weight: 700;">{{ total }}</span> bản ghi</div>
    <div class="flex" style="gap:10px">
      <div class="flex items-center">Số bản ghi/trang</div>
      <div style="width: 80px;">
        <misa-combobox :modelValue="pageSize" :options="paginationOptions" position="top" @change="updatePageSize"></misa-combobox>
      </div>
      <div class="flex items-center">1 - 10 bản ghi</div>
      <div class="flex items-center">
        <div class="icon__leftarrow"></div>
      </div>
      <div class="flex items-center">
        <div class="icon__rightarrow"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MisaPagination',
  data() {
    return {
      paginationOptions:[{value:10,label:10},{value:20,label:20},{value:50,label:50},{value:100,label:100}]
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    }
  },
  emits:['update:pageSize', 'update:pageIndex'],
  methods: {
    updatePageSize(value){
      this.$emit('update:pageSize', value)
    },
    updatePageIndex(value){
      this.$emit('update:pageIndex', value)
    }
  },
}
</script>