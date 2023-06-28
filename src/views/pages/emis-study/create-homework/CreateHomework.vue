<script setup>
import { computed, defineEmits, defineProps } from "vue";
import QuestionView from "./QuestionView.vue";
import { useExerciseStore } from "@/store/exercise";
import MisaEnum from "@/js/base/enum";
import { emitter } from "@/main";
import { question } from "@/js/img/getImg";

const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});

const exerciseStore = useExerciseStore();
const questions = computed(() => exerciseStore.detailExercise.questions);
const questionTypeOptions = computed(() => exerciseStore.questionTypeOptions);

/**
 * Mở dialog sửa câu hỏi
 * @param {*} value
 * Created By: NQTruong (20/06/2023)
 */
const clickQuestionImg = (value) => {
  emitter.emit("homework-dialog-visible", {
    isShow: true,
    formType: MisaEnum.FormActions.Add,
    questionTypes: value,
    index: -1,
  });
};
/**
 * Render class
 * Created By: NQTruong (20/06/2023)
 */
const renderDirection = () => {
  console.log("change type", props.type, questions.value?.length);
  switch (props.type) {
    case MisaEnum.FormActions.Add:
      return "horizontal";
    case MisaEnum.FormActions.Edit:
      if (questions.value?.length > 0) {
        return "vertical";
      } else {
        return "horizontal";
      }
    default:
      return "horizontal";
  }
};
</script>
<template>
  <div class="content relative compose">
    <div class="compose-exercise" :class="renderDirection()">
      <div class="extract homework-upload">
        <div class="h5 extract__title mb-6">
          Tách câu hỏi tự động sử dụng công nghệ AI
        </div>
        <div class="upload-wrap relative flex justify-center">
          <div class="button-download-wrap absolute bottom-6">
            <misa-button type="primary" class="ms-button purple">
              Tải lên file bài tập
            </misa-button>
            <misa-button type="primary" class="ms-button green">
              Tải file Excel mẫu
            </misa-button>
          </div>
          <div
            class="file-container extract__content text-center"
            is-auto-upload="false"
          >
            <label class="drop-zone"
              ><div
                class="file-extract w-full h-full flex flex-col justify-center items-center overflow-hidden cursor-pointer"
              >
                <div class="extract__content__icon">
                  <img
                    alt="file"
                    src="https://sisapapp.misacdn.net/lms/img/ic_extract.d2689d03.svg"
                    height="64"
                  />
                </div>
                <div class="extract__content__desc">
                  Nhấn để tải lên file bài tập hoặc kéo thả file vào đây.<br />File
                  có định dạng xls, xlsx, doc, docx, pdf
                </div>
                <div class="h-10 mt-3"></div></div
            ></label>
            <div class="preview-menu-container">
              <div class="ms-upload-field position-relative">
                <label class="label-input"><span></span></label
                ><input
                  type="file"
                  class="position-relative"
                  accept=".png,.jpg,.jpeg,.bmp,.doc,.docx,.xls,.xlsx,.pdf,.mp3,.mp4,.m4a,.ppt,.pptx,.odp"
                  style="display: none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="question-view">
        <div v-for="(question, index) in questions" :key="index">
          <QuestionView :question="question" :index="index" />
        </div>
      </div>
      <div class="compose">
        <div class="h5 mb-6">hoặc tự tạo câu hỏi mới</div>
        <div class="toolbar" :class="renderDirection()">
          <div class="step-composing-four">
            <div class="question-library">
              <img
                alt="icon"
                src="https://sisapapp.misacdn.net/lms/img/library.fc851823.svg"
                class="question__icon"
                width="64"
              />
              <div class="question__desc">Thư viện học liệu</div>
            </div>
          </div>
          <div class="decore-horizontal decore ml-5">
            <img
              alt="line"
              src="https://sisapapp.misacdn.net/lms/img/line.32d94e2c.svg"
            />
          </div>
          <div class="step-composing-three w-full">
            <div
              class="question"
              v-for="(question, index) in questionTypeOptions"
              :key="index"
              @click="clickQuestionImg(question.value)"
            >
              <div>
                <img
                  :src="question?.img"
                  class="question__icon"
                  width="64"
                  alt="question-icon"
                />
              </div>
              <div class="question__desc">{{ question.label }}</div>
            </div>
          </div>
          <div class="decore-vertical decore"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content.compose {
  width: calc(100% - 344px);
  margin: 0 auto;
}
.content {
  height: calc(100% - 128px);
}
.compose-exercise.vertical {
  display: none;
}
.compose-exercise {
  color: #4e5b6a;
  height: 100%;
  padding-bottom: 20px;
}
.homework-upload {
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.compose-exercise .compose {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
}
.extract__title {
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 18px;
  line-height: 26px;
}
.upload-wrap {
  width: 840px;
  height: 224px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.upload-wrap .button-download-wrap {
  display: flex;
  z-index: 5;
  position: absolute;
  bottom: 1.5rem;
}
.upload-wrap .extract__content {
  width: 840px;
  height: 224px;
  border: 2px dashed #b6b9ce;
  padding: 24px 0;
  border-radius: 10px;
}
.file-container .drop-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
}
.file-extract {
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.upload-wrap .extract__content__icon {
  margin-bottom: 16px;
  height: 64px;
}
.toolbar {
  display: flex;
}
.toolbar.horizontal .decore-horizontal {
  margin-right: 56px;
  display: block;
  margin-left: 1.25rem;
}
.toolbar.horizontal .step-composing-three {
  display: flex;
  justify-content: center;
  padding-left: 0.5rem;
  gap: 54px;
}
.toolbar.horizontal .question {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 64px;
}
.mb-6 {
  margin-bottom: 1.5rem;
}

.h5,
.title {
  font-weight: 700;
  font-size: 18px;
}
.toolbar.horizontal .question__desc {
  width: -webkit-max-content;
  width: max-content;
  margin-top: 12px;
}
.toolbar.horizontal .question-library {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 8px;
  width: 120px;
}
.toolbar.vertical .question-library {
  display: none;
}
.toolbar .question__icon:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
.toolbar .question__icon {
  cursor: pointer;
  outline: none;
}
.toolbar.vertical .question__desc {
  display: none;
}
.toolbar.vertical .question {
  height: 40px;
  margin-bottom: 8px;
}
.toolbar.vertical .question img {
  width: 40px;
  height: 40px;
}
.toolbar.vertical .decore-vertical {
  display: block;
  width: 40px;
  height: 2px;
  background-color: #b6b9ce;
  border-radius: 4px;
  margin: 12px 0;
}
.toolbar.vertical .decore-horizontal,
.compose > .h5.mb-6,
.compose-exercise.vertical > .homework-upload {
  display: none;
}
.toolbar.vertical {
  display: flex;
  flex-direction: column;
}
.compose-exercise.vertical {
  display: flex;
  gap: 24px;
}
.question-view {
  padding-right: 32px;
  width: 100%;
  overflow-y: auto;
}
.vertical .question-view {
  height: 100%;
}
.horizontal .question-view {
  height: fit-content;
}
.ms-button {
  min-width: 113px;
  padding: 0 12px;
  margin-right: 12px;
  margin-left: 0 !important;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
}
.purple {
  background-color: #ece7fe !important;
  color: #8a6bf6 !important;
}
.green {
  color: #00c542;
  background-color: rgba(0, 197, 66, 0.2);
}
</style>
