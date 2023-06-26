<script setup>
import { defineEmits, defineProps } from "vue";
import QuestionView from "./QuestionView.vue";
const props = defineProps({
  type: {
    type: Number,
    default: 1,
  },
  exercise: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["openDialog"]);
const clickQuestionImg = (value) => {
  emit("openDialog", value);
};
</script>
<template>
  <div class="content relative compose">
    <div
      class="compose-exercise"
      :class="type == 1 ? 'horizontal' : 'vertical'"
    >
      <div class="extract homework-upload">
        <div class="h5 extract__title mb-6">
          Tách câu hỏi tự động sử dụng công nghệ AI
        </div>
        <div class="upload-wrap relative flex justify-center">
          <div class="button-download-wrap absolute bottom-6">
            <button
              class="el-button ms-button el-button--default mt-3 mr-3 button--accent"
              type="button"
            >
              <!----><!----><span class="flex items-center justify-center"
                >Tải lên file bài tập</span
              ></button
            ><button
              class="el-button ms-button el-button--default mt-3 button--green"
              type="button"
            >
              <!----><!----><span class="flex items-center justify-center"
                >Tải file Excel mẫu</span
              >
            </button>
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
                <label
                  class="label-input"
                  for="0acb3c49-cc47-4f3d-9031-97465d55bead"
                  ><span></span></label
                ><input
                  type="file"
                  class="position-relative"
                  accept=".png,.jpg,.jpeg,.bmp,.doc,.docx,.xls,.xlsx,.pdf,.mp3,.mp4,.m4a,.ppt,.pptx,.odp"
                  id="0acb3c49-cc47-4f3d-9031-97465d55bead"
                  style="display: none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="question-view">
        <div v-for="(question,index) in exercise.questions" :key="index">
          <QuestionView :question="question" :index="index+1" />
        </div>
      </div>
      <div class="compose">
        <div class="h5 mb-6">hoặc tự tạo câu hỏi mới</div>
        <div class="toolbar" :class="type == 1 ? 'horizontal' : 'vertical'">
          <div class="step-composing-four">
            <div class="question-library">
              <img
                src="https://sisapapp.misacdn.net/lms/img/library.fc851823.svg"
                class="question__icon"
                width="64"
              />
              <div class="question__desc">Thư viện học liệu</div>
            </div>
          </div>
          <div class="decore-horizontal decore ml-5">
            <img src="https://sisapapp.misacdn.net/lms/img/line.32d94e2c.svg" />
          </div>
          <div class="step-composing-three w-full">
            <div class="question" @click="clickQuestionImg(1)">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu chọn đáp án"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/select.c15dfe74.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Chọn đáp án</div>
            </div>
            <div class="question" @click="clickQuestionImg(2)">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu đúng sai"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/yesorno.7f4f0b5a.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Đúng Sai</div>
            </div>
            <div class="question">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu điền vào chỗ trống"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/fill.af676902.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Điền vào chỗ trống</div>
            </div>
            <div class="question">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu ghép nối"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/pairing.4e1fb31f.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Ghép nối</div>
            </div>
            <div class="question">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu hỏi nhóm"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/group.ca2a19ef.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Câu hỏi nhóm</div>
            </div>
            <div class="question last-child">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu tự luận"
              >
                <img
                  src="https://sisapapp.misacdn.net/lms/img/essay.e07e1e68.svg"
                  class="question__icon"
                  width="64"
                />
              </div>
              <div class="question__desc">Tự luận</div>
            </div>
          </div>
          <div class="decore-vertical decore"></div>
        </div>
      </div>
      <!---->
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
.question-view{
  width: 100%;
}
</style>
