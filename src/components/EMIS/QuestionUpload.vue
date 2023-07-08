<template>
  <div class="upload-wrap relative flex justify-center">
    <div class="button-download-wrap absolute bottom-6">
      <misa-button type="primary" class="ms-button purple" @click="clickChooseFile">
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
        id="fileItem"
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
  <misa-dialog
    v-model="isDialogVisible"
    width="fit-content"
    title="Nhập khẩu"
  >
    <div class="upload-padding">
      <div class="upload-report">
        <div class="upload-report-container record">
          <div class="">{{ t("file.records") }}</div>
          <div class="upload-records-number white">
            {{ validateData.count }}
          </div>
        </div>
        <div class="upload-report-container valid">
          <div class="">{{ t("reuse.valid") }}</div>
          <div class="upload-valid-number white">
            {{ validateData.validData.length }}
          </div>
        </div>
        <div class="upload-report-container invalid">
          <div class="">{{ t("reuse.invalid") }}</div>
          <div class="upload-invalid-number white">
            {{ validateData.inValidData.length }}
          </div>
        </div>
      </div>
    </div>

    <div class="upload__button">
      <misa-button type="secondary" @click="closeDialog">{{
        t("reuse.cancel")
      }}</misa-button>
      <misa-button type="secondary" @click="clickChooseFile">Đổi file khác</misa-button>
      <misa-button>{{ t("reuse.continue") }}</misa-button>
    </div>
  </misa-dialog>
</template>

<script setup>
import { ref } from "vue";
import { dispatchNotification } from "../Notification";

const isDialogVisible = ref(false);
const validateData = ref({
  count: 0,
  validData: [],
  inValidData: [],
});
const isDropHover = ref(false);
const fileInput = ref(null);
const clickChooseFile = () => {
  fileInput.value.click();
};
const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = "copy";
};
const handleDrop = (event) => {
  handleFiles(event.dataTransfer.files);
  event.preventDefault();
};
const handleFileInputChange = (e) => {
  handleFiles(e.target.files);
};
const loading = ref(false);
/**
 * Handle validate file
 * @param {*} files
 * Created By: NQTruong (01/06/2023)
 */
const handleFiles = (files) => {
  if (files.length == 0) {
    return;
  }
  loading.value = true;
  const file = files[0];
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
    file.size < 5 * 1024 * 1024
  ) {
    console.log("call import api here", file);
    isDialogVisible.value = true;
  } else {
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      dispatchNotification({
        content: "File không đúng định dạng ",
        type: "error",
      });
    }
    if (file.size > 5 * 1024 * 1024) {
      dispatchNotification({
        content: "File lớn hơn 5MB",
        type: "error",
      });
    }
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
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
.upload-report {
  min-height: fit-content;
}
.upload__button {
  border: none;
  justify-content: end;
  gap: 12px;
  padding: 0;
}
.upload-padding {
  padding: 0;
}
.upload-report-container {
  width: 176px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  &.record {
    background: url(https://sisapapp.misacdn.net/lms/img/bg_all_result.55a89d0a.svg)
      no-repeat;
  }
  &.valid {
    background: url(https://sisapapp.misacdn.net/lms/img/bg_success_result.a787b100.svg)
      no-repeat;
  }
  &.invalid {
    background: url(https://sisapapp.misacdn.net/lms/img/bg_fail_result.85f0e138.svg)
      no-repeat;
  }
  .white {
    color: white;
  }
}
</style>
