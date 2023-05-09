<template>
  <div class="flex" style="width: fit-content">
    <div class="checkbox flex items-center">
      <input
        type="checkbox"
        class="checkbox__input"
        @click="toogleCheckbox()"
        :disabled="disabled"
      />
      <span class="checkmark" :class="imageCheckbox()"></span>
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
    };
  },
  props: {
    modelValue: {
      type: [Boolean, String],
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
    toogleCheckbox() {
      this.$emit("update:modelValue", !this.modelValue);
      this.$emit("click-box", !this.modelValue);
    },
    /**
     * Change image of checkbox base on value
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

