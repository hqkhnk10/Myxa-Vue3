<template>
  <div class="input-container" :style="{ width: width }">
    <div class="search-icon" v-if="search">
      <img src="../assets/emis/icon/search.svg" alt="search" width="16" height="16"/>
    </div>
    <input
      ref="input"
      :inputmode="inputmode"
      :readonly="readonly"
      v-model="inputValue"
      :class="{ invalid: !isValid,'disabled-input' : disabled, 'text-right' : type == 'number' }"
      @blur="blurEvent"
      @input="handleInput"
      :disabled="disabled"
      @focus="focusEvent"
      :placeholder="placeholder"
    />
    <button
    v-if="modelValue && reset"
      type="button"
      aria-label="Close"
      class="button__icon-default input-button-x"
      @click="resetInput()"
    >
      <img src="../assets/emis/icon/closed.png" alt="Exit" style="width: 15px" />
    </button>
    <slot name="icon"></slot>
    <span class="input__icon" v-if="loading">
      <img
        src="@/assets/icon/loading-icon.svg"
        class="loading"
        alt="loading"
        width="25"
        height="25"
      />
    </span>
    <span class="input__icon" v-if="approve">
      <img
        src="@/assets/icon/approve-icon.svg"
        class="approve"
        alt="approve"
        width="25"
        height="25"
      />
    </span>
    <p class="error"></p>
  </div>
</template>

<script>
export default {
  name: "MisaInput",
  setup(){
    let timeout
    return {timeout}
  },
  data() {
    return {
      inputValue: this.modelValue,
      loading: false,
      approve: false
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
      description: "value of input",
    },
    disabled: {
      type: Boolean,
      default: false,
      description: "disable input",
    },
    placeholder: {
      type: String,
      description: "Placeholder for the input",
    },
    isValid: {
      type: Boolean,
      default: true,
      description: "Change border color to red",
    },
    width: {
      type: String,
      default: "100%",
      description: "Custom width of input",
    },
    reset:{
      type: Boolean,
      default: false,
      description: "Show X button to reset value to ''",
    },
    inputmode:{
      type: String,
      default: 'text'
    },
    type:{
      type: String,
      default: 'text'
    },
    min:{
      type: Number,
    },
    max:{
      type: Number,
    },
    readonly:{
      type: Boolean,
      default: false
    },
    search:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    /**
     *  set value of input when prop change
     * @param {*} value
     * CreatedBy: NQTruong (15/05/2023)
     */
    modelValue(value) {
      this.inputValue = value;
    },
    /**
     *  setting up a two-way data binding
     * @param {*} value
     * CreatedBy: NQTruong (15/05/2023)
     */
    inputValue(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  emits: ["update:modelValue", "focus", "click-icon", "debounce", "blur", "click-reset"],
  methods: {
        /**
     *  Debounce the value
     * CreatedBy: NQTruong (15/05/2023)
     */
    handleInput(){
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        // Trigger the event or perform desired action after 1000ms
        this.$emit("debounce", this.modelValue)
      }, 1000)
    },
    /**
     * Reset the value of the model
     * Created At: 19/05/2023
     * @author: NQTruong
     */
    resetInput() {
      this.inputValue = null;
      this.$emit("update:modelValue", "");
      this.$emit("blur");
      this.$emit("click-reset", "");
      this.$emit("debounce", "")
    },
    /**
     * Focus the input field
     * Created At: 19/05/2023
     * @author: NQTruong
     */
    focus() {
      console.log('focus',  this.$refs.input);
      this.$refs.input.focus();
    },
    /**
     * emit blur event
     * Created At: 19/05/2023
     * @author: NQTruong
     */
    blurEvent() {
      this.$emit("blur");
    },
    /**
     * emit focus event
     * Created At: 19/05/2023
     * @author: NQTruong
     */
    focusEvent() {
      this.$emit("focus");
    },
  },
};
</script>
<style scoped>
.search-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
}
</style>