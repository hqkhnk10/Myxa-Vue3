<template>
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
      @dragover.prevent="handleDragOver"
      is-auto-upload="false"
      @click="clickChooseFile"
      @drop.prevent="handleDrop"
    >
      <input
        class="input__upload"
        ref="fileInput"
        type="file"
        accept=".xlsx"
        style="display: none"
        @change="handleFileInputChange"
      />
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
            Nhấn để tải lên file bài tập hoặc kéo thả file vào đây.<br />File có
            định dạng xls, xlsx, doc, docx, pdf
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
</template>

<script setup>
import { ref } from "vue";

const isDropHover = ref(false);
const fileInput = ref(null);
const clickChooseFile = () => {
  console.log("123");
  fileInput.value.click();
};
const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = "copy";
};
const handleDrop = (event) => {
  console.log("e", event.dataTransfer.files);
  event.preventDefault();
  const files = event.dataTransfer.files;
};
</script>

<style scoped>
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
  z-index: 1;
  width: 840px;
  height: 224px;
  border: 2px dashed #b6b9ce;
  padding: 24px 0;
  border-radius: 10px;
}
.file-container.hover {
  border: 1px solid red;
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
