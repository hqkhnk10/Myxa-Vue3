<template>
  <table aria-describedby="table">
    <tr>
      <th style="width: 50px;" class="sticky-col first-col" v-if="checkbox">
        <misa-checkbox v-model="headerBox"></misa-checkbox>
      </th>
      <th v-for="(header,index) in modelValue.header" :key="index">
        {{ header.label }}
      </th>
    </tr>
    <tr v-for="(row,index) in modelValue.data" :key="index">
      <td class="sticky-col first-col" v-if="checkbox">
        <misa-checkbox></misa-checkbox>
      </td>
      <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
      <td style="width:0;padding:0">
        <div class="button__table">
          <div class="button-icon-table">
            <div class="tooltip">
              <div class="icon__pencil"></div>
              <span class="tooltiptext tooltiptext-top">Sửa</span>
            </div>
          </div>
          <div class="button-icon-table">
            <div class="tooltip">
              <div class="icon__threedots"></div>
              <span class="tooltiptext tooltiptext-top dropdown">Thêm
                nữa...</span>
              <div id="myDropdown" class="dropdown-content">
                <a style="color: #d2d2d2;">Sử dụng</a>
                <a>Ngưng sử dụng</a>
                <a style="color:red">Xóa</a>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'MisaTable',
  data() {
    return {
      checkBoxes: 0,
      headerBox: false,
    };
  },
  props: {
    modelValue: {
      type: Object,
    },
    checkbox:{
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue() {
      this.$emit('update:modelValue', !this.modelValue)
    },
    checkBoxRow(){
      
    },
    checkAll(){

    }
  }
}
</script>

