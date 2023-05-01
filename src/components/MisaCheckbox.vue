<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" @click="toogleCheckbox" :disabled="disabled">
    <span class="checkmark" :class="modelValue ? 'checkmark__checked' : ''"></span>
  </div>
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
      type: Boolean,
      default: false
    },
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Function
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toogleCheckbox(){
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>

