<template>
  {{ options }}
    <div class="mcombobox" @click="toggleOptions">
        <misa-input type="text" :modelValue="modelValue"></misa-input>
        <span class="input__icon" style="right: 40px;">
            <img src="/libs/mcombobox/icon/loading-icon.svg" class="loading" alt="loading" />
        </span>
        <button class="mcombobox__button"></button>
        <div class="mcombobox__data" v-if="optionsBox">
          <a v-for="(item,index) in options" class="mcombobox-item" :key="index" @click="selectOption(item)">{{ item.label }}</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MisaCombobox',
  data() {
    return {
      optionsBox: false
    };
  },
  props: {
    modelValue:{
      type: [String,Number],
      required: true
    },
    options:{
      type: Object
    }
  },
  computed:{
    widthDialog(){
      return `width: ${this.width}`
    },
    paddingTop(){
      return `padding-top: ${this.top}`
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggleDialog() {
      this.$emit('update:modelValue',!this.modelValue)
    },
    toggleOptions(){
      this.optionsBox= !this.optionsBox
    },
    selectOption(item){
      this.$emit('update:modelValue',item.value)
    }
  }
}
</script>

