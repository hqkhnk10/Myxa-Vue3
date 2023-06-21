<template>
  <div class="exercise-dialog">
    <div class="exercise-body">
      <div class="exercise-container">
        <div class="exercise-type">
          <span>Câu 1</span>
          <misa-combobox
            class="trans-bg"
            :options="questionTypeOptions"
            v-model="question.questionType"
          ></misa-combobox>
        </div>
        <div style="height: 100%">
          <CKEditor></CKEditor>
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
                    tabindex="0"
                    @click="deleteAnswer(index)"
                  >
                    <img
                      src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
                      width="18"
                      alt="icon"
                    />
                  </div>
                  <div class="upload-icon toolbar-icon" tabindex="0">
                    <img
                      src="https://sisapapp.misacdn.net/lms/img/ck_file.301a99b1.svg"
                      width="18"
                      alt="icon"
                    />
                  </div>
                  <div
                    class="checkbox-icon toolbar-icon bg-default"
                    id="checkbox-0"
                    tabindex="0"
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
              <div class="answer-body" @click="showEditor(index, true)">
                <div class="answer-content" v-if="answer?.showEditor">
                  <CKEditorAnswer
                    v-model="answer.answerContent"
                    @on-blur="showEditor(index, false)"
                  ></CKEditorAnswer>
                </div>
                <div
                  class="answer-value"
                  v-else
                  v-html="answer.answerContent"
                ></div>
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
          <misa-button type="default">{{ t("emis.saveAndClose") }}</misa-button>
          <misa-button>{{ t("emis.saveAndAdd") }}</misa-button>
        </div>
      </div>
    </div>
    <div class="exercise-note">
      <div class="w-full h-full">
        <img
          src="https://sisapapp.misacdn.net/lms/img/bg_button_yellow.f17d419c.svg"
        />
      </div>
      <div class="note-icon">
        <img
          src="https://sisapapp.misacdn.net/lms/img/icon_answer_compose.fee2cfd8.svg"
          width="48"
          height="42"
        />
        <div class="label text-neutral-500 text-center">Thêm lời giải</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CKEditor from "@/components/CKEditor/CKEditor.vue";
import CKEditorAnswer from "@/components/CKEditor/CKEditorAnswer.vue";
import { formatIndexToAlphabet } from "@/js/format/format";
import { ref, defineProps, onMounted, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: Number,
    description: "1.Chọn đáp án, 2.Đúng/sai",
  },
  value: {
    type: Object,
    default: () => null,
  },
});
const emits = defineEmits(["close-dialog"]);
// const postData = ref({
//   exercise: {
//     exerciseName: "Phép trừ",
//     exerciseStatus: 1,
//     subjectId: 1,
//     gradeId: 2,
//     topicId: null,
//   },
//   questionType: 1,
//   questionContent: "10 - 1",
//   questionNote: "9",
//   answers: [
//     {
//       answerContent: "1",
//       status: false,
//     },
//     {
//       answerContent: "9",
//       status: true,
//     },
//     {
//       answerContent: "0",
//       status: false,
//     },
//     {
//       answerContent: "10",
//       status: false,
//     },
//   ],
// });
// const exercise = ref({})
const question = ref({});

const questionTypeOptions = ref([
  { value: 1, label: "1" },
  { value: 1, label: "2" },
  { value: 1, label: "3" },
  { value: 1, label: "4" },
  { value: 1, label: "5" },
]);
const answers = ref([]);
onMounted(() => {
  if (!props.value) {
    createDefatulAnswer();
  }
});
const createDefatulAnswer = () => {
  switch (props.type) {
    case 1:
      answers.value = [
        {
          answerContent: "",
          status: false,
        },
        {
          answerContent: "",
          status: false,
        },
        {
          answerContent: "",
          status: false,
        },
        {
          answerContent: "",
          status: false,
        },
      ];
      break;
    case 2:
      answers.value = [
        {
          answerContent: "Đúng",
          status: false,
        },
        {
          answerContent: "Sai",
          status: false,
        },
      ];
      break;
    default:
      break;
  }
};
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
const clickCloseButton = () => {
  emits("close-dialog");
};
const showEditor = (index, visible) => {
  answers.value[index].showEditor = visible;
};

const checkStatus = (index) => {
  answers.value[index].answerStatus = !answers.value[index].answerStatus;
};
const deleteAnswer = (index) => {
  answers.value.splice(index, 1);
};
const addAnswer = () => {
  answers.value.push({});
};
</script>

<style scoped>
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
  height: calc(100vh - 204px);
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
.answer-content {
  border-radius: 10px;
  border: 3px solid;
  border-color: #f59ad4;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  transition: 0.2s;
}
.answer-body,
.answer-content {
  height: 100%;
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
  right: 0;
  position: fixed;
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
