<template>
  <div style="overflow: auto;">
    <table aria-describedby="table">
      <thead class="table__header">
        <tr>
          <th style="width: 50px;" class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="headerBox" @click-box="checkAll"></misa-checkbox>
          </th>
          <th v-for="(header, index) in modelValue.header" :key="index" :style="{width: header.width}">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in modelValue.data" :key="index">
          <td class="sticky-col first-col" v-if="checkbox">
            <misa-checkbox v-model="row.select" @click-box="checkBoxRow(value)"></misa-checkbox>
          </td>
          <td v-for="(header, index) in  modelValue.header" :key="index">
            <slot :name="header.prop" v-bind="row" v-if="header.slot"></slot>
            <div v-else>{{ row[header.prop] }}</div>
          </td>
            <div class="button__table">
              <slot name="operator" v-bind="row"></slot>
            </div>
        </tr>
      </tbody>
    </table>
  </div>
  <misa-pagination v-if="pagination" :total="modelValue.data.length"></misa-pagination>
</template>

<script>
export default {
  expose: ['getSelectedRows'],
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
      default: false,
      description: 'show checkbox or not'
    },
    pagination: {
      type: Boolean,
      default: false,
      description: 'show pagination or not'
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
      this.$emit('select')
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
  emits: ['update:modelValue','select'],
  computed: {
    getSelectedRows(){
      return this.modelValue.data.filter(row=>row.select)
    },
  },
  methods: {
    updateValue() {
      this.$emit('update:modelValue', !this.modelValue)
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
        this.modelValue.data.forEach(row => { row.select = true; this.checkBoxes = this.modelValue.data.length })
      }
      else {
        this.modelValue.data.forEach(row => { row.select = false; this.checkBoxes = 0 })
      }
    }
  }
}
</script>

