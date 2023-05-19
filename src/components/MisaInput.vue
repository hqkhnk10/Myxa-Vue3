<template>
  <div class="input-container" :style="{ width: width }">
    <input
      ref="input"
      v-model="inputValue"
      :class="{ invalid: !isValid }"
      @blur="blurEvent"
      @input="handleInput"
      :disabled="disabled"
      @focus="focusEvent"
      :placeholder="placeholder"
    />
    <slot name="icon"></slot>
    <span class="input__icon">
      <img
        src="@/assets/icon/loading-icon.svg"
        class="loading"
        alt="loading"
        width="25"
        height="25"
      />
    </span>
    <span class="input__icon">
      <img
        src="@/assets/icon/approve-icon.svg"
        class="approve"
        alt="approve"
        width="25"
        height="25"
      />
    </span>
    <button
      v-if="modelValue && reset"
      type="button"
      aria-label="Close"
      class="button__icon-default input-button-x"
      @click="resetInput()"
    >
      <img src="../assets/icon/x-icon.svg" alt="Exit" style="width: 15px" />
    </button>
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
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    //TODO: validate input value
    validateEvent: {
      type: Function,
    },
    trigger: {
      type: String,
      default: "change",
    },
    class: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    reset:{
      type: Boolean,
      default: false,
    }
  },
  watch: {
    /**
     *  set value of input when prop change
     * @param {*} value
     */
    modelValue(value) {
      this.inputValue = value;
    },
    /**
     *  setting up a two-way data binding
     * @param {*} value
     */
    inputValue(newValue) {
      this.$emit("update:modelValue", newValue);
      this.$emit("change", this.modelValue);
    },
  },
  emits: ["update:modelValue", "change", "focus", "click-icon", "debounce"],
  methods: {
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
     * @author: QTNgo
     */
    resetInput() {
      this.$emit("update:modelValue", "");
      this.$emit("debounce", "")
    },
    /**
     * Focus the input field
     * Created At: 19/05/2023
     * @author: QTNgo
     */
    focus() {
      this.$refs.input.focus();
    },
    /**
     * emit blur event
     * Created At: 19/05/2023
     * @author: QTNgo
     */
    blurEvent() {
      this.$emit("blur");
    },
    /**
     * emit focus event
     * Created At: 19/05/2023
     * @author: QTNgo
     */
    focusEvent() {
      this.$emit("focus");
    },
  },
};
</script>
