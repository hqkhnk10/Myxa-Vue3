<template>
  <div style="overflow: auto;">
    <table aria-describedby="table">
      <thead>
        <tr>
          <th style="width: 50px;" class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="headerBox" @click="checkAll"></misa-checkbox>
          </th>
          <th v-for="(header, index) in modelValue.header" :key="index">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in modelValue.data" :key="index">
          <td class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="row.select" @click-box="value => checkBoxRow(index, value)"></misa-checkbox>
          </td>
          <td v-for="(header, index) in  modelValue.header" :key="index">
            <slot :name="header.prop" v-bind="row" v-if="header.slot"></slot>
            <div v-else>{{ row[header.prop] }}</div>
          </td>
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
      </tbody>
    </table>
  </div>
  <misa-pagination v-if="pagination" :total="modelValue.data.length"></misa-pagination>
</template>

<script>
export default {
  name: 'MisaTable',
  data() {
    return {
      checkBoxes: 0,
      headerBox: false,
      headerArray: []
    };
  },
  props: {
    modelValue: {
      type: Object,
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    checkBoxes(newValue) {
      if (newValue == this.modelValue.data.length) {
        this.headerBox = true
        return
      }
      if (newValue == 0) {
        this.headerBox = false
      }
      else {
        this.headerBox = 'half'
      }
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue() {
      this.$emit('update:modelValue', !this.modelValue)
    },
    checkBoxRow(index, value) {
      if (value) {
        this.checkBoxes++;
      } else {
        this.checkBoxes--;
      }
    },
    checkAll() {
      if (this.checkBoxes == 0) {
        this.modelValue.data.forEach(row => { row.select = true, this.checkBoxes = this.modelValue.data.length })
      }
      else {
        this.modelValue.data.forEach(row => { row.select = false, this.checkBoxes = 0 })
      }
    }
  }
}
</script>

