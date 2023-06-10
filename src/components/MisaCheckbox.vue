<template>
  <div class="checkbox-container">
    <div class="checkbox flex items-center" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <input
        type="checkbox"
        class="checkbox__input"
        @click="toogleCheckbox()"
        :disabled="disabled"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @mouseleave="isFocus = false"
      />
      <span class="checkmark" :class="imageCheckbox()"></span>
      <span class="checkmark-attr" :class="{ 'checkmark-disabled': disabled, 'checkmark-hover': isHover, 'checkmark-focus': isFocus}"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MisaInput",
  data() {
    return {
      inputValue: "",
      isHover: false,
      isFocus: false,
    };
  },
  props: {
    modelValue: {
      type: [Boolean, String, null, undefined],
      default: false,
    },
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validateEvent: {
      type: Function,
    },
  },
  emits: ["update:modelValue", "click-box"],
  methods: {
    /**
     * update value of checkbox
     * CreatedBy: NQTruong (15/05/2023)
     */
    toogleCheckbox() {
      this.$emit("update:modelValue", !this.modelValue);
      this.$emit("click-box", !this.modelValue);
    },
    /**
     * Change image of checkbox base on value
     * CreatedBy: NQTruong (15/05/2023)
     */
    imageCheckbox() {
      switch (this.modelValue) {
        case true: //checked
          return "checkmark__checked";
        case "half": //half check (use in table header)
          return "checkmark__half";
        case false: //unchecked
          return "";
        default:
          return "";
      }
    },
  },
};
</script>
