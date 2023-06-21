<script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import HomeworkDialog from "./HomeworkDialog.vue";
import InformationDialog from "./InformationDialog.vue";
import CreateHomework from "./CreateHomework.vue";
import { getGrades } from "@/api/grade";
import { getSubjects } from "@/api/subject";
const dialogValue = ref({
  modelValue: null,
  type: "add",
  visible: false,
});
const grades = ref([]);
const subjects = ref([]);
const addInfoDialog = ref(false)
onBeforeMount(() => {
  getGrades().then((res) => {
    grades.value = res.data.map((e) => ({
      value: e.gradeId,
      label: e.gradeName,
    }));
  }),
    getSubjects().then((res) => {
      subjects.value = res.data.map((e) => ({
        value: e.subjectId,
        label: e.subjectName,
      }));
    });
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
const openDialog = (value) =>{
  dialogValue.value.visible = true;
  dialogValue.value.type = value
}
const closeDialog = () =>{
  dialogValue.value.visible = false;
}
const openAddInfoDialog = () =>{
  addInfoDialog.value = true
}
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
            <misa-combobox
              :options="subjects"
              :placeholder="t('emis.allSubject')"
            ></misa-combobox>
            <misa-combobox
              :options="grades"
              :placeholder="t('emis.allGrade')"
            ></misa-combobox>
            <misa-button type="default" @click="openAddInfoDialog">{{ t('emis.addInformation') }}</misa-button>
            <misa-button type="default">{{ t('emis.changePrepare') }}</misa-button>
          </div>
          <div class="prepare-button-right">
            <misa-button type="default"></misa-button>
            <misa-button>{{ t('emis.try') }}</misa-button>
            <misa-button>{{ t('emis.finish') }}</misa-button>
          </div>
        </div>
      </div>
    </div>
    <create-homework @open-dialog="openDialog"></create-homework>
    <HomeworkDialog v-if="dialogValue.visible" :type="dialogValue.type" :value="dialogValue.modelValue" @close-dialog="closeDialog"></HomeworkDialog>
    <information-dialog v-if="addInfoDialog" v-model="addInfoDialog"></information-dialog>
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
