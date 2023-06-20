<template>
  <div class="exercise-dialog">
    <div class="exercise-body">
      <div class="exercise-container">
        <div class="exercise-type">Câu 11312312</div>
        <div style="height: 100%">
          <CKEditor></CKEditor>
        </div>
        <div class="answer-container">
          <div class="exercise-answer">
            <div
              v-for="(answer, index) in answers"
              :key="index"
              class="answer-card"
              :class="getAnswerBg(index)"
            >
              <div class="answer-header">
                <div>{{ formatIndexToAlphabet(index) }}</div>
                <div class="answer-icon">
                  <div class="delete-icon toolbar-icon" tabindex="0">
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
                  <CKEditorAnswer></CKEditorAnswer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exercise-button">
        <div>
          <misa-button></misa-button>
        </div>
        <div class="exercise-button-right">
          <misa-button></misa-button>
          <misa-button></misa-button>
          <misa-button></misa-button>
        </div>
      </div>
    </div>
    <div class="exercise-note">
      <div class="w-full h-full">
        <img
          src="https://sisapapp.misacdn.net/lms/img/bg_button_yellow.f17d419c.svg"
        />
      </div>
      <div
        class="note-icon"
      >
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
import { ref } from "vue";

const answers = ref([
  {
    index: "A",
    answer: "Test",
    correct: false,
  },
  {
    index: "A",
    answer: "Test",
    correct: false,
  },
  {
    index: "A",
    answer: "Test",
    correct: false,
  },
  {
    index: "A",
    answer: "Test",
    correct: false,
  },
]);

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
.note-icon{
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
</style>
