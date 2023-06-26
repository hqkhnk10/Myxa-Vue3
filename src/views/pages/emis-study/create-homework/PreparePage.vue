<script setup>
import { onMounted, ref, onBeforeMount, computed } from "vue";
import HomeworkDialog from "./HomeworkDialog.vue";
import InformationDialog from "./InformationDialog.vue";
import CreateHomework from "./CreateHomework.vue";
import { postQuestion } from "@/api/question";
import { useRoute, useRouter } from "vue-router";
import { useExerciseStore } from "@/store/exercise";
import { useGradeStore } from "@/store/grade";
import { useSubjectStore } from "@/store/subject";
import MisaEnum from "@/js/base/enum";

const route = useRoute();
const { push } = useRouter();

/**
 * Lấy dữ liệu trong store
 * Created By: NQTruong (20/06/2023)
 */
const exerciseStore = useExerciseStore();
const gradeStore = useGradeStore();
const subjectStore = useSubjectStore();

const type = ref(MisaEnum.FormActions.Add);
const id = computed(() => route.params.id);

const questionType = ref(0);
const grades = computed(() => {
  return gradeStore.grade;
});
const subjects = computed(() => {
  return subjectStore.subject;
});
const exerciseId = computed(() => exerciseStore.getExerciseId);
const exerciseForm = computed(() => exerciseStore.detailExercise);
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
    exerciseStore.getExerciseById(id.value);
    type.value = MisaEnum.FormActions.Edit;
  }
});
/**
 * Mở dialog bổ sung thông tin
 * Created By: NQTruong (20/06/2023)
 */
const openAddInfoDialog = () => {
  addInfoDialog.value = true;
};
/**
 * Thay đổi ảnh theo subject
 * @param {*} value
 * Created By: NQTruong (20/06/2023)
 */
const changeSubject = (value) => {};
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
/**
 * Về trang chủ
 * Created By: NQTruong (20/06/2023)
 */
const backHomepage = () => {
  push(MisaEnum.Router.StudyPage);
};
</script>
<template>
  <div class="prepare-container">
    <div class="prepare-header">
      <div class="back-button" @click="backHomepage">
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
    <create-homework :type="type"></create-homework>
    <HomeworkDialog ref="hwdialog"></HomeworkDialog>
    <information-dialog
      v-if="addInfoDialog"
      ref="infodialog"
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
.prepare-container {
  background: white;
  height: 100%;
}
</style>
