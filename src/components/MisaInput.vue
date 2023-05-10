<template>
  <div class="input-container">
    <input 
      ref="input" 
      v-model="inputValue" 
      :class="{'invalid': !isValid}" 
      @blur="blurEvent" 
      :disabled="disabled"
      @change="changeEvent" 
      @focus="focusEvent" 
      :placeholder="placeholder"
    />
    <slot name="icon"></slot>
    <span class="input__icon">
      <img src="@/assets/icon/loading-icon.svg" class="loading" alt="loading" width="25" height="25"/>
    </span>
    <span class="input__icon">
      <img src="@/assets/icon/approve-icon.svg" class="approve" alt="approve" width="25" height="25"/>
    </span>
    <p class="error"></p>
  </div>
</template>

<script>
export default {
  name: 'MisaInput',
  data() {
    return {
      inputValue: this.modelValue
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    isValid: {
      type: Boolean,
      default: true
    },
    //TODO: validate input value
    validateEvent: {
      type: Function
    },
    trigger: {
      type: String,
      default: 'change'
    },
    class: {
      type: String,
      default: ''
    }
  },
  watch: {
    /**
     *  set value of input when prop change
     * @param {*} value 
     */
    modelValue(value) {
      this.inputValue = value
    },
    /**
 *  setting up a two-way data binding
 * @param {*} value 
 */
    inputValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'click-icon'],
  methods: {
    clickIcon(){
      this.$emit('click-icon')
    },
    focus() {
      this.$refs.input.focus();
    },
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

