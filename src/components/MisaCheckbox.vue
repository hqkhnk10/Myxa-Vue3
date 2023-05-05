<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" @click="toogleCheckbox" :disabled="disabled">
    <span class="checkmark" :class="imageCheckbox()"></span>
  </div>
  <slot></slot>
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
      type: [Boolean,String],
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
  emits: ['update:modelValue', 'click-box'],
  methods: {
    toogleCheckbox() {
      this.$emit('update:modelValue', !this.modelValue)
      this.$emit('click-box', !this.modelValue)
    },
    imageCheckbox() {
      switch (this.modelValue) {
        case true:
          return 'checkmark__checked'
        case 'half':
          return 'checkmark__half'
        case false:
          return ''
        default:
          return ''
      }
    }
  }
}
</script>

