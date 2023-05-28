<template>
  <div
    v-if="modelValue"
    class="confirm-dialog"
    ref="confirmDialog"
    tabindex="-1"
    @keydown.esc="closeConfirmDialog"
  >
    <div class="confirm-dialog-container">
      <div class="confim-dialog-padding">
        <div class="confirm-dialog-content">
          <div class="dialog__header">
            <span class="dialog__title">{{ title }}</span>
            <button
              type="button"
              aria-label="Close"
              class="dialog__headerbtn"
              @click="closeConfirmDialog"
            >
              <div class="tooltip">
                <div class="icon__x"></div>
                <span class="arrow-top tooltip-margin-top tooltiptext tooltiptext-top">{{
                  t("reuse.close")
                }}</span>
              </div>
            </button>
          </div>
          <div class="confirm-dialog__body">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="confirm-dialog-buttons">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$refs.confirmDialog.focus();
  },
  emits: ["update:modelValue"],
  methods: {
    closeConfirmDialog() {
      this.$emit("update:modelValue", false);
    },
    openConfirmDialog() {
      this.$emit("update:modelValue", true);
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
.confirm-dialog__body {
  padding-top: 24px;
}
.confim-dialog-padding {
  padding: 24px;
}
.confirm-dialog-container {
  background-color: white;
  min-width: 480px;
  height: fit-content;
}
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.confirm-dialog-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.confirm-dialog-buttons button {
  margin-left: 10px;
}
</style>
