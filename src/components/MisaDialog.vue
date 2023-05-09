<template>
  <div
    v-if="modelValue"
    role="dialog"
    aria-modal="true"
    aria-label="Tips"
    class="dialog-show"
    :style="paddingTop"
  >
    <div class="dialog__padding" :style="widthDialog">
      <div class="dialog__header">
        <span class="dialog__title">{{ title }}</span>
        <button
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
          @click="toggleDialog"
        >
          <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width: 12px" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaDialog",
  data() {
    return {};
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "width: 60%",
    },
    top: {
      type: String,
      default: "10vh",
    },
  },
  computed: {
    /**
     * Set style of the dialog
     */
    widthDialog() {
      return `width: ${this.width}`;
    },
    paddingTop() {
      return `padding-top: ${this.top}`;
    },
  },
  emits: ["update:modelValue"],
  methods: {
    toggleDialog() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>
