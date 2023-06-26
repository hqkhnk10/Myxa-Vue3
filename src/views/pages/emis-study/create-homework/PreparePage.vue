<script setup>
import { onMounted, ref, onBeforeMount, computed } from "vue";
import HomeworkDialog from "./HomeworkDialog.vue";
import InformationDialog from "./InformationDialog.vue";
import CreateHomework from "./CreateHomework.vue";
import { ImageServer } from "@/../public/global";
import { postQuestion } from "@/api/question";
import { useRoute } from "vue-router";
import { getDetailExercise } from "@/api/exercise";
import { useExerciseStore } from "@/store/exercise";
import { useGradeStore } from "@/store/grade";
import { useSubjectStore } from "@/store/subject";

const exerciseStore = useExerciseStore();
const gradeStore = useGradeStore();
const subjectStore = useSubjectStore();

const type = ref(1);
const route = useRoute();
const id = computed(() => route.params.id);
const dialogValue = ref({
  modelValue: null,
  type: "add",
  visible: false,
});
const grades = computed(() => {
  return gradeStore.grade;
});
const subjects = computed(() => {
  return subjectStore.subject;
});
const exercise = ref({});
const exerciseForm = ref({
  subjectId: 1,
  gradeId: 1,
  exerciseName: "",
  subjectImage: "http://127.0.0.1:8081/default.png",
});
const addInfoDialog = ref(false);
/**
 * Lấy dữ liệu khối và lớp
 * Created By: NQTruong (20/06/2023)
 */
onBeforeMount(() => {
  gradeStore.getAllGrades();
  subjectStore.getAllSubjects();
});
/**
 * Xét dữ liệu xem đang ở màn nào (add,detail)/ Có dữ liệu: Màn detail, Không có: Add
 * Created By: NQTruong (20/06/2023)
 */
onMounted(() => {
  if (id.value) {
    getDetailExercise(id.value).then((res) => {
      exercise.value = res.data[0];
    });
    type.value = 2;
  }
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
const openDialog = (value) => {
  dialogValue.value.visible = true;
  dialogValue.value.type = value;
};
const closeDialog = () => {
  dialogValue.value.visible = false;
};
const openAddInfoDialog = () => {
  addInfoDialog.value = true;
};
/**
 * Thay đổi ảnh theo subject
 * @param {*} value 
 * Created By: NQTruong (20/06/2023)
 */
const changeSubject = (value) => {
  exerciseForm.value.subjectImage = subjects.value?.find(
    (e) => e.value == value
  ).img
    ? `${ImageServer}${subjects.value?.find((e) => e.value == value).img}`
    : `${ImageServer}default.png`;
};
/**
 * Update dữ liệu bài tập
 * @param {*} form 
 * Created By: NQTruong (20/06/2023)
 */
const updateForm = (form) => {
  exerciseForm.value = { ...form };
};
/**
 * Thêm bài tập
 * @param {*} question 
 * @param {*} answers 
 * Created By: NQTruong (20/06/2023)
 */
const addQuestion = (question, answers) => {
  postQuestion({
    exercise: { ...exerciseForm.value },
    ...question,
    answers: answers,
  });
};
</script>
<template>
  <div>
    {{ subjects }}
    {{ grades }}
    <div class="prepare-header">
      <div class="back-button">
        <img src="../../../../assets/emis/icon/back.svg" alt="back" />
      </div>
      <div class="prepare-container">
        <div class="prepare-title">
          <img
            :src="exerciseForm.subjectImage"
            class="round-img"
            alt="subject"
          />
          <input
            placeholder="Nhập tên bài tập..."
            class="input-title"
            v-model="exerciseForm.exerciseName"
          />
        </div>
        <div class="prepare-button">
          <div class="prepare-button-left">
            <misa-combobox
              v-model="exerciseForm.subjectId"
              :options="subjects"
              :placeholder="t('emis.allSubject')"
              @change="changeSubject"
            ></misa-combobox>
            <misa-combobox
              v-model="exerciseForm.gradeId"
              :options="grades"
              :placeholder="t('emis.allGrade')"
            ></misa-combobox>
            <misa-button type="default" @click="openAddInfoDialog">{{
              t("emis.addInformation")
            }}</misa-button>
            <misa-button type="default">{{
              t("emis.changePrepare")
            }}</misa-button>
          </div>
          <div class="prepare-button-right">
            <misa-button type="default"></misa-button>
            <misa-button>{{ t("emis.try") }}</misa-button>
            <misa-button>{{ t("emis.finish") }}</misa-button>
          </div>
        </div>
      </div>
    </div>
    <create-homework
      @open-dialog="openDialog"
      :type="type"
      :exercise="exercise"
    ></create-homework>
    <HomeworkDialog
      v-if="dialogValue.visible"
      :type="dialogValue.type"
      :value="dialogValue.modelValue"
      @close-dialog="closeDialog"
      @add-question="addQuestion"
    ></HomeworkDialog>
    <information-dialog
      v-if="addInfoDialog"
      v-model="addInfoDialog"
      :formValue="exerciseForm"
      @update-form="updateForm"
    ></information-dialog>
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
.round-img {
  border-radius: 9999px;
  width: 40px;
  height: 40px;
}
.input-title {
  color: #4e5b6a;
  font-weight: 700;
  line-height: 32px;
  font-size: 24px;
}
.input-title::placeholder {
  color: #4e5b6a;
  font-weight: 700;
  line-height: 32px;
  font-size: 24px;
}
input {
  padding: 0;
}
</style>
