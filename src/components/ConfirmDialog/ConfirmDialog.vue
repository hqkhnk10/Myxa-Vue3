<template>
  <div v-if="isOpen" class="confirm-dialog">
    <div class="confirm-dialog-content">
      <div class="dialog__header">
        <span class="dialog__title">{{ dialog?.title }}</span>
        <button
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
          @click="closeConfirmDialog"
        >
          <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width: 12px" />
        </button>
      </div>
      <div class="confirm-dialog-text">
        {{ dialog?.content }}
      </div>
      <div class="confirm-dialog-buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ConfirmDialog",
  setup() {
    const isOpen = ref(true);
    return { isOpen };
  },
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeConfirmDialog() {
      this.isOpen = false;
    },
    openConfirmDialog() {
      this.isOpen = true;
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

.confirm-dialog-content {
  background-color: white;
  padding: 20px;
  max-width: 400px;
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
