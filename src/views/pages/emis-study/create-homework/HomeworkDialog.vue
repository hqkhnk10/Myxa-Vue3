<template>
  <div class="exercise-dialog" v-if="dialogVisible">
    <div v-if="!noteDialog">
      <div class="exercise-body">
        <div class="exercise-container">
          <div class="exercise-type">
            <span
              >Câu
              {{
                type == MisaEnum.FormActions.Edit
                  ? questionIndex + 1
                  : nextQuestion + 1
              }}
              -</span
            >
            <misa-combobox
              class="trans-bg"
              :options="questionTypeOptions"
              v-model="question.questionType"
              @change="changeQuestionType"
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
            <component :is="tabs[currentTab]" :answers="answers"></component>
          </div>
        </div>
        <div class="exercise-button">
          <div>
            <misa-button
              type="default"
              v-if="question.questionType == MisaEnum.QuestionType.ChooseAnswer"
              @click="addAnswer"
              >{{ t("emis.addAnswers") }}</misa-button
            >
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
            <span
              >Câu
              {{
                type == MisaEnum.FormActions.Edit
                  ? questionIndex + 1
                  : nextQuestion + 1
              }}
            </span>
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
            src="https://sisapapp.misacdn.net/lms/img/icon_back.006a615c.svg"
            width="48"
            height="42"
          />
          <div class="label text-neutral-500 text-center">Quay lại câu hỏi</div>
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
import MisaEnum from "@/js/base/enum";
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
import {
  ChooseAnswer,
  TrueOrFalse,
  FillAnswer,
} from "@/components/EMIS/Answers/index";

const tabs = {
  ChooseAnswer,
  TrueOrFalse,
  FillAnswer,
};
const currentTab = computed(() => {
  switch (question.value.questionType) {
    case MisaEnum.QuestionType.Choosing:
      return "ChooseAnswer";
    case MisaEnum.QuestionType.TrueFalse:
      return "TrueOrFalse";
    case MisaEnum.QuestionType.Fill:
      return "FillAnswer";
    default:
      return "";
  }
});

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

const nextQuestion = computed(() => exerciseStore.getTotalQuestion);
const question = ref({
  questionType: questionType.value,
  questionContent: "",
  questionNote: "",
});
const questionTypeOptions = exerciseStore.questionTypeOptions;
const answers = computed(() => exerciseStore.answers);
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
      createDefaultQuestion();
    } else {
      question.value = JSON.parse(
        JSON.stringify(getDetailQuestion.value(questionIndex.value))
      );
      exerciseStore.answers = question.value.answers;
      questionNote.value = question.value.questionNote;
    }
  }
);
const createDefaultQuestion = () => {
  question.value = {
    questionType: questionType.value,
    questionContent: "",
    questionNote: "",
  };
  questionNote.value = "";
};
const changeQuestionType = (type) => {
  question.value.questionType = type;
  exerciseStore.createDefatulAnswer(type);
};
/**
 * Tắt dialog
 * Created By: NQTruong (20/06/2023)
 */
const clickCloseButton = () => {
  dialogVisible.value = false;
};
/**
 * Thêm câu trả lời
 * Created By: NQTruong (20/06/2023)
 */
const addAnswer = () => {
  exerciseStore.addAnswer();
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
 * Created By: NQTruong (20/06/2023)
 */
const validate = () => {
  if (!question.value.questionContent) {
    showNotification("Bạn vui lòng nhập nội dung câu hỏi");
    return false;
  }
  const validAnswers = answers.value.filter((a) => a.answerContent);
  switch (question.value.questionType) {
    case MisaEnum.QuestionType.Choosing:
      return validateChoosingAnswer(validAnswers);
    case MisaEnum.QuestionType.TrueFalse:
      return validateTrueFalseAnswer(validAnswers);
    case MisaEnum.QuestionType.Fill:
      return validateFillAnswer(validAnswers);
    default:
      break;
  }
  return true;
};
/**
 * Validate chọn câu trả lời
 * @param {*} validAnswers
 * Created By: NQTruong (01/07/2023)
 */
const validateFillAnswer = (validAnswers) => {
  if (validAnswers.length == 0) {
    showNotification("Bạn vui lòng nhập nội dung đáp án");
    return false;
  }
};
/**
 * Validate chọn câu trả lời
 * @param {*} validAnswers
 * Created By: NQTruong (01/07/2023)
 */
const validateChoosingAnswer = (validAnswers) => {
  if (validAnswers.length == 0) {
    showNotification("Bạn vui lòng nhập nội dung đáp án");
    return false;
  }
  if (!validAnswers.some((a) => a.answerStatus)) {
    showNotification("Bạn vui lòng nhập nội dung đáp án, chọn đáp án đúng");
    return false;
  }
};
/**
 * Validate câu trả lời Đúng/sai
 * @param {*} validAnswers
 * Created By: NQTruong (01/07/2023)
 */
const validateTrueFalseAnswer = (validAnswers) => {
  if (validAnswers.length == 2) {
    showNotification("Bạn vui lòng nhập nội dung đáp án");
    return false;
  }
  if (validAnswers.filter((a) => a.answerContent).length != 1) {
    showNotification("Bạn vui lòng nhập nội dung đáp án, chọn đáp án đúng");
    return false;
  }
};
/**
 * Lưu và thêm mới
 * Created By: NQTruong (01/07/2023)
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
      exerciseStore.createDefatulAnswer(questionType.value);
      createDefaultQuestion();
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
  questionNote.value = question.value.questionNote;
  noteDialog.value = false;
};
/**
 * Lưu lời giải thích
 * Created By: NQTruong (20/06/2023)
 */
const questionNote = ref("");
const saveNote = () => {
  question.value.questionNote = questionNote.value;
  console.log("note", question.value.questionNote, questionNote.value);
  noteDialog.value = false;
};
</script>

<style lang="scss" scoped>
.exercise-note {
  cursor: pointer;
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
  color: #606266;
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
.fill-button {
  margin-top: 12px;
  display: flex;
  .add-answer {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #b6b9ce;
    border-radius: 10px;
    background-color: #f1f2f7;
    cursor: pointer;
    color: rgba(78, 91, 106, 0.7);
    .button-title {
      margin-left: 12px;
    }
  }
}
</style>
