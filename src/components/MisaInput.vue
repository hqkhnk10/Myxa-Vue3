<template>
  <div class="input-container" :style="{ width: width }">
    <input
      ref="input"
      v-model="inputValue"
      :class="{ invalid: !isValid,'disabled-input' : disabled }"
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
      <img src="../assets/icon/x-icon.svg" alt="Exit" style="width: 15px" />
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
      this.$emit("change", this.modelValue);
    },
  },
  emits: ["update:modelValue", "change", "focus", "click-icon", "debounce", "blur"],
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
      this.$emit("update:modelValue", "");
      this.$emit("debounce", "")
    },
    /**
     * Focus the input field
     * Created At: 19/05/2023
     * @author: NQTruong
     */
    focus() {
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
