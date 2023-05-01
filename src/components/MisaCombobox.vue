<template>
  {{ options }}
    <div class="mcombobox">
        <input type="text" class="mcombobox__input">
        <span class="input__icon" style="right: 40px;">
            <img src="/libs/mcombobox/icon/loading-icon.svg" class="loading" alt="loading" />
        </span>
        <button class="mcombobox__button"></button>
        <div class="mcombobox__data" api="https://provinces.open-api.vn/api/" propText="name" propValue="code">
        </div>
    </div>
</template>

<script>
export default {
  name: 'MisaCombobox',
  data() {
    return {
    };
  },
  props: {
    modelValue:{
      type: Boolean,
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
    }
  }
}
</script>

