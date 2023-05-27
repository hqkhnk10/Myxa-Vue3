<template>
  <div
    v-if="modelValue"
    role="dialog"
    aria-modal="true"
    aria-label="Tips"
    class="dialog-show"
    @keydown.esc="toggleDialog"
  >
    <div class="dialog__padding" :style="widthDialog">
      <div class="dialog__header">
        <span class="dialog__title">{{ title }}</span>
        <div class="dialog__header-button">
        <button
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
        >
        <div class="tooltip">
          <div class="icon__help"></div>
          <span class="tooltiptext tooltiptext-top">{{ t('reuse.guide') }}</span>
        </div>
        </button>
        <button
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
          @click="toggleDialog"
        >

        <div class="tooltip">
          <div class="icon__x"></div>
          <span class="tooltiptext tooltiptext-top">{{ t('reuse.close') }}</span>
        </div>
        </button>
      </div>
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
      default: "60%",
    },
    top: {
      type: String,
      default: "10vh",
    },
  },
  computed: {
    /**
     * Set wid of the dialog
     * CreatedBy: QTNgo (15/05/2023)
     */
    widthDialog() {
      return `width: ${this.width}`;
    },
    /**
     * Set padding top of the dialog
     * CreatedBy: QTNgo (15/05/2023)
     */
    paddingTop() {
      return `padding-top: ${this.top}`;
    },
  },
  emits: ["update:modelValue"],
  methods: {
    /**
     * Toggle the visibility of the dialog
     * CreatedBy: QTNgo (15/05/2023)
     */
    toggleDialog() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>
