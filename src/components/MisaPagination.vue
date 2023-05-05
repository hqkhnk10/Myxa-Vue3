<template>
  <div class="flex" style="justify-content: space-between;align-items: center;">
    <div>Tổng số: <span style="font-weight: 700;">{{ total }}</span> bản ghi</div>
    <div class="flex" style="gap:10px">
      <div class="flex items-center">Số bản ghi/trang</div>
      <div>
        <div class="custom-select" style="width: 90px;">
          <div class="select__icon">
            <img src="@/assets/icon/arrow-down.svg" alt="Arrow down">
          </div>
          <select>
            <option value="0" selected></option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
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
    return {}
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
  }
}
</script>