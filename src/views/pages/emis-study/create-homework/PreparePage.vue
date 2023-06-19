<script setup>
import { onMounted, ref } from "vue";
import HomeworkDialog from "./HomeworkDialog.vue";
const dialogValue = ref({
  form: {},
  type: "add",
  visible: true,
});
onMounted(() => {
  /**
   * Event bus toggle dialog
   * @param isShow: to show the dialog
   * Created At: 19/06/2023
   * @author NQTruong
   */
//   this.emitter.on("open-dialog", (param) => {
//     dialogValue.value.visible = true;
//     dialogValue.value.type = param.type;
//     dialogValue.value.form = param.form;
//   });
});
</script>
<template>
  <div>
    <div class="prepare-header">
      <div class="back-button">
        <img src="../../../../assets/emis/icon/back.svg" alt="back" />
      </div>
      <div class="prepare-container">
        <div class="prepare-title">
          <img />
          <input />
        </div>
        <div class="prepare-button">
          <div class="prepare-button-left">
            <misa-combobox></misa-combobox>
            <misa-combobox></misa-combobox>
            <misa-button></misa-button>
            <misa-button></misa-button>
          </div>
          <div class="prepare-button-right">
            <misa-button></misa-button>
            <misa-button></misa-button>
            <misa-button></misa-button>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <HomeworkDialog v-if="dialogValue.visible"></HomeworkDialog>
  </div>
</template>
<style scoped>
.prepare-header,
.prepare-title,
.prepare-button,
.prepare-button-left,
.prepare-button-right,
.prepare-container {
  display: flex;
  gap: 12px;
}
.prepare-container {
  flex: 1;
  flex-direction: column;
}
.prepare-button {
  justify-content: space-between;
}
.prepare-header {
  gap: 12px;
  background: white;
  padding: 16px 20px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
}
.prepare-button-right {
  margin-right: 12px;
}
</style>
