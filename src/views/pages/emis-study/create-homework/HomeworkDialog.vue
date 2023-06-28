<template>
  <div class="exercise-dialog" v-if="dialogVisible">
    <div v-if="!noteDialog">
      <div class="exercise-body">
        <div class="exercise-container">
          <div class="exercise-type">
            <span>Câu {{ nextQuestion }} -</span>
            <misa-combobox
              class="trans-bg"
              :options="questionTypeOptions"
              v-model="question.questionType"
            ></misa-combobox>
          </div>
          <div style="height: 100%">
            <CKEditor
              ref="ckquestion"
              v-model="question.questionContent"
              placeholder="Nhập câu hỏi tại đây"
            ></CKEditor>
          </div>
          <div class="answer-container">
            <div class="exercise-answer">
              <div v-if="type == 2" class="answer-card hidden"></div>
              <div
                v-for="(answer, index) in answers"
                :key="index"
                class="answer-card"
                :class="getAnswerBg(index)"
              >
                <div class="answer-header">
                  <div>{{ formatIndexToAlphabet(index) }}</div>
                  <div class="answer-icon">
                    <div
                      class="delete-icon toolbar-icon"
                      @click="deleteAnswer(index)"
                    >
                      <img
                        src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
                        width="18"
                        alt="icon"
                      />
                    </div>
                    <div class="upload-icon toolbar-icon">
                      <img
                        src="https://sisapapp.misacdn.net/lms/img/ck_file.301a99b1.svg"
                        width="18"
                        alt="icon"
                      />
                    </div>
                    <div
                      class="checkbox-icon toolbar-icon bg-default"
                      id="checkbox-0"
                      :class="{ 'tick-status': answer.answerStatus }"
                      @click="checkStatus(index)"
                    >
                      <img
                        src="https://sisapapp.misacdn.net/lms/img/ic_uncheck.ceabec80.svg"
                        width="14"
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
                <div class="answer-body">
                  <div class="answer-content">
                    <CKEditorAnswer
                      v-model="answer.answerContent"
                    ></CKEditorAnswer>
                  </div>
                </div>
              </div>
              <div v-if="type == 2" class="answer-card hidden"></div>
            </div>
          </div>
        </div>
        <div class="exercise-button">
          <div>
            <misa-button type="default" v-if="type !== 2" @click="addAnswer">{{
              t("emis.addAnswers")
            }}</misa-button>
          </div>
          <div class="exercise-button-right">
            <misa-button type="default" @click="clickCloseButton">{{
              t("emis.cancel")
            }}</misa-button>
            <misa-button type="default" @click="saveQuestion(false)">{{
              t("emis.saveAndClose")
            }}</misa-button>
            <misa-button @click="saveQuestion(true)">{{
              t("emis.saveAndAdd")
            }}</misa-button>
          </div>
        </div>
      </div>
      <div class="exercise-note right" @click="openNote">
        <div class="w-full h-full">
          <img
            alt="note"
            src="https://sisapapp.misacdn.net/lms/img/bg_button_yellow.f17d419c.svg"
          />
        </div>
        <div class="note-icon">
          <img
            alt="note"
            src="https://sisapapp.misacdn.net/lms/img/icon_answer_compose.fee2cfd8.svg"
            width="48"
            height="42"
          />
          <div class="label text-neutral-500 text-center">Thêm lời giải</div>
        </div>
      </div>
    </div>
    <div v-if="noteDialog">
      <div class="exercise-body">
        <div class="exercise-container">
          <div class="exercise-type">
            <span>Câu 1 -</span>
          </div>
          <div style="height: 100%">
            <CKEditor
              v-model="questionNote"
              placeholder="Nhập lời giải thích"
            ></CKEditor>
          </div>
        </div>
        <div class="exercise-button">
          <div></div>
          <div class="exercise-button-right">
            <misa-button type="default" @click="closeNote">{{
              t("emis.cancel")
            }}</misa-button>
            <misa-button @click="saveNote">{{ t("reuse.save") }}</misa-button>
          </div>
        </div>
      </div>
      <div class="exercise-note left" @click="closeNote">
        <div class="w-full h-full">
          <img
            alt="note"
            src="https://sisapapp.misacdn.net/lms/img/bg_button_yellow.f17d419c.svg"
          />
        </div>
        <div class="note-icon">
          <img
            alt="note"
            src="https://sisapapp.misacdn.net/lms/img/icon_answer_compose.fee2cfd8.svg"
            width="48"
            height="42"
          />
          <div class="label text-neutral-500 text-center">Thêm lời giải</div>
        </div>
      </div>
    </div>
  </div>
  <misa-confirm-dialog
    v-if="notification.visible"
    v-model="notification.visible"
    title="EMIS Ôn tập"
  >
    <template #content>
      {{ notification.content }}
    </template>
  </misa-confirm-dialog>
</template>

<script setup>
import CKEditor from "@/components/CKEditor/CKEditor.vue";
import CKEditorAnswer from "@/components/CKEditor/CKEditorAnswer.vue";
import MisaEnum from "@/js/base/enum";
import { formatIndexToAlphabet } from "@/js/format/format";
import { useExerciseStore } from "@/store/exercise";
import { storeToRefs } from "pinia";
import {
  ref,
  defineEmits,
  defineExpose,
  watch,
  onMounted,
  computed,
} from "vue";
import { emitter } from "@/main";

const emits = defineEmits(["close-dialog"]);
const dialogVisible = ref(false);
defineExpose({
  dialogVisible,
});
const type = ref("");
const questionType = ref(0);
const questionIndex = ref(-1);
onMounted(() => {
  /**
   * Event bus dialog visible
   * @param isShow: to open/close the dialog
   * Created At: 20/06/2023
   * @author NQTruong
   */
  emitter.on("homework-dialog-visible", function (args) {
    const { isShow, formType, questionTypes, index } = { ...args };
    console.log("emit", isShow, formType, questionTypes, index);
    dialogVisible.value = isShow;
    type.value = formType;
    questionType.value = questionTypes;
    questionIndex.value = index;
  });
});
const notification = ref({
  visible: false,
  content: "",
});
const exerciseStore = useExerciseStore();
const { getDetailQuestion } = storeToRefs(exerciseStore);

const nextQuestion = computed(() => exerciseStore.getTotalQuestion + 1);
const question = ref({
  questionType: questionType.value,
  questionContent: "",
  questionNote: "",
});
const questionTypeOptions = exerciseStore.questionTypeOptions;
const answers = ref([]);
const ckquestion = ref(null);
/**
 * Thay đổi dữ liệu khi mở dialog
 * Created By: NQTruong (20/06/2023)
 */
watch(
  () => dialogVisible.value,
  (visible) => {
    if (!visible) {
      return;
    }
    if (type.value == MisaEnum.FormActions.Add) {
      exerciseStore.createDefatulAnswer(questionType.value);
      question.value = {
        questionType: questionType.value,
        questionContent: "",
      };
      answers.value = exerciseStore.answers;
    } else {
      question.value = getDetailQuestion.value(questionIndex.value);
      answers.value = question.value?.answers;
    }
  }
);

/**
 * Lấy background của câu trả lời
 * @param {*} index
 * Created By: NQTruong (20/06/2023)
 */
const getAnswerBg = (index) => {
  switch (index % 4) {
    case 1: //1,5,9
      return "answer-bg-pink";
    case 2: //2,6,10
      return "answer-bg-green";
    case 3: //3,7,11
      return "answer-bg-orange";
    case 0: //4,8,12
      return "answer-bg-blue";
    default:
      return "answer-bg-white";
  }
};
/**
 * Tắt dialog
 * Created By: NQTruong (20/06/2023)
 */
const clickCloseButton = () => {
  dialogVisible.value = false;
};
/**
 * Thay đổi dữ liệu đúng/sai của đáp án
 * @param {*} index
 * Created By: NQTruong (20/06/2023)
 */
const checkStatus = (index) => {
  answers.value[index].answerStatus = !answers.value[index].answerStatus;
};
/**
 * Xóa câu trả lời
 * @param {*} index
 * Created By: NQTruong (20/06/2023)
 */
const deleteAnswer = (index) => {
  answers.value.splice(index, 1);
};
/**
 * Thêm câu trả lời
 * Created By: NQTruong (20/06/2023)
 */
const addAnswer = () => {
  answers.value.push({});
};
/**
 * Hiện thông báo validate
 * @param {*} content
 * Created By: NQTruong (20/06/2023)
 */
const showNotification = (content) => {
  notification.value = {
    visible: true,
    content,
  };
};
/**
 * Validate trước khi thêm/sửa câu hỏi
 */
const validate = () => {
  if (!question.value.questionContent) {
    showNotification("Bạn vui lòng nhập nội dung câu hỏi");
    return false;
  }
  const validAnswers = answers.value.filter((a) => a.answerContent);
  if (validAnswers.length == 0) {
    showNotification("Bạn vui lòng nhập nội dung đáp án");
    return false;
  }
  if (!validAnswers.some((a) => a.answerStatus)) {
    showNotification("Bạn vui lòng nhập nội dung đáp án và đáp án đúng");
    return false;
  }
  return true;
};
/**
 * Lưu và thêm mới
 * Created By: NQTruong (20/06/2023)
 */
const saveQuestion = async (visible) => {
  if (validate()) {
    const success = await exerciseStore.addQuestion(
      type.value,
      question.value,
      answers.value
    );
    if (success) {
      dialogVisible.value = visible;
    }
  }
};
/**
 * Mở note
 * Created By: NQTruong (20/06/2023)
 */
const noteDialog = ref(false);
const openNote = () => {
  noteDialog.value = true;
};
/**
 * Đóng note
 * Created By: NQTruong (20/06/2023)
 */
const closeNote = () => {
  questionNote.value = "";
  noteDialog.value = false;
};
const questionNote = ref("");
/**
 * Lưu lời giải thích
 * Created By: NQTruong (20/06/2023)
 */
const saveNote = () => {
  question.value.questionNote = questionNote.value;
  closeNote();
};
</script>

<style scoped>
.exercise-note {
  cursor: pointer;
}
.answer-bg-white {
  background-color: white;
}
.answer-bg-pink {
  background-color: rgb(255, 214, 240);
}
.answer-bg-green {
  background-color: rgb(172, 235, 241);
}
.answer-bg-orange {
  background-color: rgb(252, 208, 198);
}
.answer-bg-blue {
  background-color: rgb(196, 229, 255);
}
.exercise-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
.exercise-body {
  margin-top: 24px;
  width: 1076px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  height: calc(100vh - 104px);
  margin-bottom: 0;
  position: relative;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.exercise-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;
  overflow-y: auto;
}
.exercise-answer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
.answer-card {
  width: 245px;
  height: 232px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 8px;
  position: relative;
}
.answer-card .hidden {
  visibility: hidden;
}
.exercise-editor {
  max-height: 60%;
}
.answer-container {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  background: white;
  flex: 1;
  border-radius: 0 0 10px 10px;
}
.exercise-type {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  background-color: #f8e373;
  padding: 0 12px;
  border-radius: 10px 0 10px 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  height: 40px;
}
.toolbar-icon {
  background-color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 8px;
  outline: none;
}
.toolbar-icon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}
.answer-header {
  display: flex;
  justify-content: space-between;
}
.answer-icon {
  display: flex;
}
.answer-content:has(.ck-focused) {
  border-radius: 10px;
  border: 3px solid;
  border-color: #f59ad4;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  transition: 0.2s;
}
.answer-body,
.answer-content {
  height: 100%;
}
.answer-content {
  max-height: 170px;
}
.answer-body {
  height: 200px;
}
.exercise-button {
  display: flex;
  justify-content: space-between;
}
.exercise-button-right {
  display: flex;
  gap: 12px;
}
.exercise-note {
  height: 160px;
  top: calc(50% - 80px);
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  width: 6rem;
  position: fixed;
}
.exercise-note.right {
  right: 0;
}
.exercise-note.left {
  left: 0;
}
.note-icon {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  position: absolute;
  margin-top: 1.75rem;
  gap: 16px;
}
.answer-value {
  justify-content: center;
  position: absolute;
  top: 40%;
  display: flex;
  width: 100%;
}
.tick-status {
  background-color: #00c542;
}
</style>
