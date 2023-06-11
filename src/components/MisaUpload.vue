<template>
  <div class="dialog-show" v-if="modelValue">
    <div class="dialog__padding upload">
      <div class="dialog__header upload">
        <span class="dialog__title"> {{ t("reuse.import") }}</span>
        <div class="dialog__header-button">
          <button
            type="button"
            aria-label="Close"
            class="dialog__headerbtn"
            @click="closeDialog"
          >
            <div class="tooltip">
              <div class="icon__x"></div>
              <span
                class="arrow-top tooltip-margin-top tooltiptext tooltiptext-top"
                >{{ t("reuse.close") }}</span
              >
            </div>
          </button>
        </div>
      </div>
      <div class="upload-progess upload-padding">
        <div class="radio__container radio-upload">
          <span>{{ t("file.chooseImportFile") }}</span>
          <input type="radio" :value="0" :checked="true" />
          <span
            :class="
              uploadingPhase ? 'radio__checkmark' : 'radio__checkmark-disabled'
            "
          ></span>
        </div>
        <div class="dashed-line">
          <div class="border-dashed"></div>
        </div>
        <div class="radio__container radio-upload">
          <span>{{ t("reuse.import") }}</span>
          <input type="radio" :value="0" :checked="true" />
          <span
            :class="
              !uploadingPhase ? 'radio__checkmark' : 'radio__checkmark-disabled'
            "
          ></span>
        </div>
      </div>
      <div
        v-if="uploadingPhase"
        class="uploadingPhase-container upload-padding"
      >
        <div
          class="drop-area"
          :class="{
            'drop-hover': isDropHover,
            'cursor-pointer': uploadedFiles.length == 0,
            'border-solid': uploadedFiles.length > 0,
          }"
          @dragover.prevent="handleDragOver"
          @dragenter.prevent="isDropHover = true"
          @dragleave.prevent="isDropHover = false"
          @dragove.prevent="isDropHover = true"
          @drop.prevent="handleDrop"
          @click="openFileInput"
        >
          <misa-loading v-model="loading"></misa-loading>
          <div class="drop-area-mid" v-if="uploadedFiles.length == 0">
            <div>
              <img
                src="@/assets/icon/ic_file-download.svg"
                alt="file-download"
                width="60"
              />
            </div>
            <div>{{ t("file.guideDrop") }}</div>
            <div class="drop-description">
              {{ t("file.description") }}
            </div>
          </div>
          <div v-if="uploadedFiles.length">
            <div
              v-for="(file, index) in uploadedFiles"
              :key="index"
              class="border-bottom"
            >
              <div class="file-info">
                <div class="file-name">{{ file.fileName }}</div>
                <div class="file-size">{{ formatFileSize(file.fileSize) }}</div>
                <div class="flex">
                  <div class="file-valid"></div>
                  {{ t("reuse.valid") }}
                </div>
                <misa-button type="link" @click.stop="changeFile">{{
                  t("file.changeFile")
                }}</misa-button>
              </div>
            </div>
          </div>
        </div>
        <input
          class="input__upload"
          ref="fileInput"
          type="file"
          accept=".xlsx"
          multiple
          style="display: none"
          @change="handleFileInputChange"
        />
        <div class="sheet-selection" v-if="worksheets.length">
          <div>
            <h3>
              {{ t("file.importedSheet") }}<span class="required">*</span>
            </h3>
            <misa-combobox
              v-model="fileOption.selectedSheet"
              :options="worksheets"
              v-model:valid="validate.selectedSheet.valid"
            ></misa-combobox>
          </div>
          <div>
            <h3>{{ t("file.header") }}<span class="required">*</span></h3>
            <misa-input
              v-model="fileOption.header"
              inputmode="numeric"
              pattern="[0-9,\.]*"
              type="number"
              :min="0"
              :isValid="validate.header.valid"
              @change="validateFileOption"
            ></misa-input>
            <div class="error active" v-if="!validate.header.valid">
              {{ validate.header.message }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="upload-padding">
        <div class="upload-report">
          <div class="upload-report-records">
            <div class="upload-records--title">{{ t("file.records") }}</div>
            <div class="upload-records-number">{{ validateData.count }}</div>
          </div>
          <div class="upload-report-valid">
            <div class="upload-valid--title">{{ t("reuse.valid") }}</div>
            <div class="upload-valid-number">
              {{ validateData.validData.length }}
            </div>
          </div>
          <div class="upload-report-invalid">
            <div class="upload-invalid--title">{{ t("reuse.invalid") }}</div>
            <div class="upload-invalid-number">
              {{ validateData.inValidData.length }}
            </div>
          </div>
        </div>
        <div class="upload-buttons">
          <misa-button type="secondary" @click="downloadAllFile">
            {{ t("file.downloadAllFile") }}
          </misa-button>
          <misa-button type="secondary" @click="downloadInvalidFile">
            {{ t("file.downloadInvalidRow") }}
          </misa-button>
        </div>
      </div>

      <div class="upload__button">
        <misa-button type="primary-border" @click="downloadSampleFile">{{
          t("file.downloadSampleFile")
        }}</misa-button>
        <div class="flex gap-12px">
          <misa-button type="secondary" @click="closeDialog">{{
            t("reuse.cancel")
          }}</misa-button>
          <misa-button type="secondary" v-if="!uploadingPhase" @click="back">{{
            t("reuse.back")
          }}</misa-button>
          <misa-button
            v-if="uploadingPhase"
            @click="uploadFile"
            :disabled="uploadedFiles.length == 0"
            >{{ t("reuse.continue") }}</misa-button
          >
          <misa-button
            v-if="!uploadingPhase"
            @click="importFile"
            :disabled="validateData?.validData.length == 0"
            >{{ t("reuse.import") }}</misa-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import {
  postSingleFile,
  downloadFile,
  getSampleFile,
  validateFile,
} from "@/api/file";
import { convertToFormData } from "@/js/format/format";
import { dispatchNotification } from "./Notification";
export default {
  name: "UploadExcel",
  data() {
    return {
      uploadingPhase: true,
      uploadedFiles: [],
      isDropHover: false,
      worksheets: [],
      data: [],
      loading: false,
      validateData: {},
      fileOption: {
        selectedSheet: 0,
        header: 2,
      },
      validate: {
        selectedSheet: {
          required: true,
          valid: true,
        },
        header: {
          required: true,
          valid: true,
          message: this.t("validate.number"),
        },
      },
    };
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    fileName: {
      type: String,
      default: "file",
    },
    keys: {
      type: String,
      required: true,
      default: "",
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    // Remove event listener when component is unmounted
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  emits: ["update:modelValue", "import-data"],
  methods: {
    /**
     * Kiểm tra dữ liệu header
     */
    validateHeader() {
      if (
        !this.fileOption.header ||
        this.fileOption.header == null ||
        this.fileOption.header == ""
      ) {
        this.validate.header.valid = false;
        this.validate.header.message = this.t("validate.required");
        return;
      }
      if (isNaN(this.fileOption.header)) {
        this.validate.header.valid = false;
        this.validate.header.message = this.t("validate.number");
        return;
      }
      if (this.fileOption.header < 0) {
        this.validate.header.valid = false;
        this.validate.header.message = this.t("validate.greaterThan0");
      } else {
        this.validate.header.valid = true;
      }
    },
    /**
     * Xác thực dữ liệu truyền lên
     */
    validateFileOption() {
      this.validateHeader();
      return this.validate.selectedSheet.valid && this.validate.header.valid;
    },
    downloadAllFile() {
      this.loading = true;
      downloadFile({ fileName: this.validateData.fileName })
        .then((response) => {
          this.saveFileToClient(`${this.fileName} toàn bộ`, response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Download invalid excel file
     * Created By: NQTruong (01/06/2023)
     */
    downloadInvalidFile() {
      this.loading = true;
      downloadFile({ fileName: this.validateData.invalidFilePath })
        .then((response) => {
          this.saveFileToClient(`${this.fileName} không hợp lệ`, response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Tải tệp mẫu
     * Created By: NQTruong (01/06/2023)
     */
    downloadSampleFile() {
      this.loading = true;
      getSampleFile({ key: this.keys })
        .then((response) => {
          this.saveFileToClient(this.fileName, response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Lưu file về máy
     * @param {*} fileName tên file
     * @param {*} response dữ liệu file server trả về
     * Created By: NQTruong (01/06/2023)
     */
    saveFileToClient(fileName, response) {
      const file = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a temporary URL for the file
      const fileURL = URL.createObjectURL(file);

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.setAttribute("download", fileName);

      // Trigger the download by simulating a click on the link
      downloadLink.click();

      // Clean up the temporary URL and link
      URL.revokeObjectURL(fileURL);
      downloadLink.remove();
    },
    /**
     * Ấn nút esc để tatwst dialog
     * @param {*} event keyboard event
     * Created By: NQTruong (01/06/2023)
     */
    handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault(); // Prevent the default browser behavior
        // Your custom logic when Ctrl + S is pressed
        this.closeDialog();
      }
    },
    /**
     * Pass data to parent component
     * Created By: NQTruong (01/06/2023)
     */
    importFile() {
      this.$emit("import-data", this.validateData);
    },
    /**
     * Close dialog import
     * Created By: NQTruong (01/06/2023)
     */
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    /**
     * Back to uploadingPhase file phase
     * Created By: NQTruong (01/06/2023)
     */
    back() {
      this.uploadingPhase = true;
    },
    /**
     * drop effect when drag over
     * @param {*} event drag file to box
     * Created By: NQTruong (01/06/2023)
     */
    handleDragOver(event) {
      event.dataTransfer.dropEffect = "copy";
    },
    /**
     * Add file to handle
     * @param {*} event drop file at the box
     * Created By: NQTruong (01/06/2023)
     */
    handleDrop(event) {
      event.preventDefault();
      this.isDropHover = false;
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    /**
     * trigger when upload file
     * @param {*} event
     * Created By: NQTruong (01/06/2023)
     */
    handleFileInputChange(event) {
      this.isDropHover = false;
      const files = event.target.files;
      if (files.length > 0) {
        this.handleFiles(files);
      }
    },
    /**
     * Handle validate file
     * @param {*} files
     * Created By: NQTruong (01/06/2023)
     */
    handleFiles(files) {
      console.log('files', files.length, this.uploadedFiles.length);
      this.loading = true;
      if (this.uploadedFiles.length > 0 && files.length > 0) {
        console.log('run here');
        this.uploadedFiles.pop();
      }
      const file = files[0];
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.size < 5 * 1024 * 1024
      ) {
        postSingleFile(convertToFormData({ file: file }))
          .then(async (res) => {
            this.uploadedFiles.push({ file, ...res });
            await this.loadWorksheets(file);
          })
          .finally(() => {
            this.loading = false;
          });
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
    },
    /**
     * Open default browser upload file
     * Created By: NQTruong (01/06/2023)
     */
    openFileInput() {
      if (this.uploadedFiles.length > 0) {
        return;
      }
      this.$refs.fileInput.click();
    },
    /**
     * Read all sheets in file
     * @param {*} file
     * Created By: NQTruong (01/06/2023)
     */
    async loadWorksheets(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          this.worksheets = workbook.SheetNames.map((sheetName, index) => ({
            label: sheetName,
            value: index,
          })).filter((sheet) => sheet.label != "Enum");
          this.fileOption.selectedSheet = 0;
        };
        reader.onprogress = () => {
          this.loading = true;
        };
        reader.onloadend = () => {
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(file);
      });
    },
    /**
     * When choose to upload file
     * Created By: NQTruong (01/06/2023)
     */
    uploadFile() {
      if (!this.validateFileOption()) {
        return;
      }
      this.loading = true;
      validateFile(
        convertToFormData({
          File: this.uploadedFiles[0].file,
          SheetIndex: this.fileOption.selectedSheet,
          Header: this.fileOption.header,
          Key: this.keys,
        })
      )
        .then((res) => {
          this.uploadingPhase = false;
          this.validateData = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Đổi từ kb sang mb
     * @param {*} fileSize kích thước file
     * Created By: NQTruong (01/06/2023)
     */
    formatFileSize(fileSize) {
      const fileSizeInMB = fileSize / (1024 * 1024);
      return fileSizeInMB.toFixed(2) + " MB";
    },
    /**
     * Change current file
     * Created By: NQTruong (01/06/2023)
     */
    changeFile() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style>
.upload-dialog {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 600px;
  height: 400px;
  border: 2px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.drop-area {
  border: 2px dashed #ccc;
  text-align: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  min-height: 220px;
}
.border-solid {
  border: 1px solid #ccc;
}
.border-bottom {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.drop-area.drop-hover {
  border-color: blue;
}

.file-info {
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 24px;
}
.file-valid {
  background-image: url("../assets/icon/success-icon.svg");
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.file-name {
  text-align: left;
  flex-basis: 30%;
}
.file-size {
  flex-basis: 10%;
}
.change-file-btn {
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
.drop-area-mid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}
.upload-progess {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.sheet-selection {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.sheet-selection > div {
  flex: 1;
}
.dashed-line {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}
.border-dashed {
  width: 100%;
  border: 1px dashed var(--color-green);
  height: 0;
}
.upload__button {
  border-top: 1px solid var(--input-border-color-gray);
  padding: 12px 24px 24px 24px;
  display: flex;
  justify-content: space-between;
}
.upload-report {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  min-height: 300px;
}
.upload-report-records {
  border: 1px solid rgb(0, 0, 97);
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  flex: 1;
  border-radius: 4px;
  height: 100px;
}
.upload-report-valid {
  border: 1px solid var(--color-blue);
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  flex: 1;
  border-radius: 4px;
  height: 100px;
}
.upload-report-invalid {
  border: 1px solid var(--color-red);
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  flex: 1;
  border-radius: 4px;
  height: 100px;
}
.upload-records--title {
  color: white;
  padding: 4px;
  background: rgb(0, 0, 97);
  text-align: center;
}
.upload-valid--title {
  color: white;
  padding: 4px;
  background: var(--color-blue);
  text-align: center;
}
.upload-invalid--title {
  color: white;
  padding: 4px;
  background: var(--color-red);
  text-align: center;
}
.upload-records-number {
  margin-top: 12px;
  color: rgb(0, 0, 97);
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}
.upload-valid-number {
  margin-top: 12px;
  color: var(--color-blue);
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}
.upload-invalid-number {
  margin-top: 12px;
  color: var(--color-red);
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}
.uploadingPhase-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}
.drop-description {
  color: gray;
}
.download-invalid-file {
  border: 1px solid var(--input-border-color-gray);
  cursor: pointer;
  border-radius: 4px;
  height: 36px;
}
.upload-buttons {
  display: flex;
  justify-content: space-between;
}
.dialog__padding.upload {
  padding: 0;
}
.dialog__header.upload {
  padding: 24px;
}
.upload-padding {
  padding: 0 24px;
}
</style>
