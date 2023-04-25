<template>
  <input v-model="inputValue" on-blur="blurEvent" :disabled="disabled" on-change="changeEvent" on-focus="focusEvent">
</template>

<script>
export default {
  name: 'MisaInput',
  data() {
    return {
      inputValue: ''
    };
  },
  props: {
    modelValue: {
      type: [String,Number],
      default: ''
    },
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder:{
      type: String
    }
  },
  watch: {
    inputValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  },
  emits: ['update:modelValue','change','focus'],
  methods: {
    renderButton() {
      console.log('type', this.type);
      return `button__${this.type}`;
    },
    blurEvent() {
      this.$emit('blur')
    },
    changeEvent() {
      this.$emit('change', this.input)
    },
    focusEvent() {
      this.$emit('focus')
    }
  }
}
</script>

