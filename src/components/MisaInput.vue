<template>
  <div>
    <input v-model="inputValue" on-blur="blurEvent" :disabled="disabled" @change="changeEvent" on-focus="focusEvent">
    <span class="input__icon">
      <image src="../assets/icon/loading-icon.svg" class="loading"></image>
    </span>
    <span class="input__icon">
      <image src="../assets/icon/approve-icon.svg" class="approve"></image>
    </span>
    <p class="error"></p>
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
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    validateEvent: {
      type: Function
    },
    trigger: {
      type: String,
      default: 'change'
    }
  },
  watch: {
    inputValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  },
  emits: ['update:modelValue', 'change', 'focus'],
  methods: {
    renderButton() {
      console.log('type', this.type);
      return `button__${this.type}`;
    },
    blurEvent() {
      this.$emit('blur')
    },
    changeEvent() {
      this.$emit('change', this.modelValue)
    },
    focusEvent() {
      this.$emit('focus')
    }
  }
}
</script>

