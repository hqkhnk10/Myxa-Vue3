<template>
  <div class="dialog-show" v-if="modelValue">
    <div class="dialog__padding">
      <div class="dialog__header">
        <span class="dialog__title">{{ t("reuse.import") }}</span>
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
      <div class="upload-progess">
        <div class="radio__container">
          <span>Chọn tệp nhậu khẩu</span>
          <input type="radio" :value="0" :checked="true" />
          <span
            :class="
              uploading ? 'radio__checkmark' : 'radio__checkmark-disabled'
            "
          ></span>
        </div>
        <div class="dashed-line">
          <div class="border-dashed"></div>
        </div>
        <div class="radio__container">
          <span>Nhập khẩu</span>
          <input type="radio" :value="0" :checked="true" />
          <span
            :class="
              !uploading ? 'radio__checkmark' : 'radio__checkmark-disabled'
            "
          ></span>
        </div>
      </div>
      <div v-if="uploading" class="uploading-container">
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
            <div>Kéo thả tệp vào đây hoặc nhấn để chọn tệp</div>
            <div class="drop-description">
              Hỗ trợ định dạng *.xls, *.xlsx và kích thước tối đa 5MB
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
                  Hợp lệ
                </div>
                <misa-button type="link" @click.stop="changeFile"
                  >Change File</misa-button
                >
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
            <h3>Select sheets to import:</h3>
            <misa-combobox
              v-model="selectedSheet"
              :options="worksheets"
            ></misa-combobox>
          </div>
          <div>
            <h3>Header:</h3>
            <misa-input v-model="header" type="number"></misa-input>
          </div>
        </div>
      </div>
      <div v-else class="upload-report">
        <div class="upload-report-records">
          <div class="upload-records--title">Số bản ghi</div>
          <div class="upload-records-number">{{ validateData.count }}</div>
        </div>
        <div class="upload-report-valid">
          <div class="upload-valid--title">Hợp lệ</div>
          <div class="upload-valid-number">{{ validateData.validData.length }}</div>
        </div>
        <div class="upload-report-invalid">
          <div class="upload-invalid--title">Không hợp lệ</div>
          <div class="upload-invalid-number">{{ validateData.inValidData.length }}</div>
        </div>
      </div>
      <div class="upload__button">
        <misa-button type="primary-border" @click="downloadSampleFile"
          >Tải tệp mẫu</misa-button
        >
        <div class="flex gap-12px">
          <misa-button type="secondary" @click="closeDialog">Hủy</misa-button>
          <misa-button type="secondary" v-if="!uploading" @click="back"
            >Quay lại</misa-button
          >
          <misa-button
            v-if="uploading"
            @click="uploadFile"
            :disabled="uploadedFiles.length == 0"
            >Tiếp tục</misa-button
          >
          <misa-button v-if="!uploading" @click="importFile"
            >Nhập khẩu</misa-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { postSingleFile } from "@/api/file";
import { convertToFormData } from "@/js/format/format";
export default {
  name: "UploadExcel",
  data() {
    return {
      uploading: true,
      header: 1,
      uploadedFiles: [],
      isDropHover: false,
      worksheets: [],
      data: [],
      selectedSheet: "",
      loading: false,
      validateData: {}
    };
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    apiSampleFile: {
      type: Function,
      default: () => {}
    },
    validateFile: {
      type: Function,
      default: () => {}
    },
    importFunction:{
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    // Remove event listener when component is unmounted
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  emits: ["update:modelValue", "import-file"],
  methods: {
    downloadSampleFile() {
      this.apiSampleFile()
        .then((response) => {
          const fileName = "example.xlsx"; // Replace with the desired filename

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
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    },
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
      this.importFunction()
      console.log("data", this.data);
      this.$emit("import-file", this.data);
      this.closeDialog();
    },
    /**
     * Close dialog import
     * Created By: NQTruong (01/06/2023)
     */
    closeDialog() {
      console.log("close");
      this.$emit("update:modelValue", false);
    },
    /**
     * Back to uploading file phase
     * Created By: NQTruong (01/06/2023)
     */
    back() {
      this.uploading = true;
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
      if (this.uploadedFiles.length > 0) {
        return;
      }
      this.handleFiles(files);
    },
    /**
     * When choose file to upload file
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
    async handleFiles(files) {
      this.loading = true;
      if (this.uploadedFiles.length > 0 && files) {
        this.uploadedFiles.pop();
      }
      const file = files[0];

      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.size < 5 * 1024 * 1024
      ) {
        const res = await postSingleFile(convertToFormData({ file: file }));
        this.uploadedFiles.push({ file, ...res });
        this.loadWorksheets(file);
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
    loadWorksheets(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        this.worksheets = workbook.SheetNames.map((sheetName, index) => ({
          label: sheetName,
          value: index,
        }));
        this.selectedSheet = 0;
      };
      reader.onloadend = () => {
        this.loading = false;
      };
      reader.readAsArrayBuffer(file);
    },
    /**
     * When choose to upload file
     * Created By: NQTruong (01/06/2023)
     */
    uploadFile() {
      this.validateFile(
        convertToFormData({
          File: this.uploadedFiles[0].file,
          SheetIndex: this.selectedSheet,
          Header: this.header,
        })
      ).then((res)=>{
        this.validateData = res
        this.uploading = false
      }).catch(()=>{});
    },
    /**
     * Transform data to misa-table data format
     * @param {*} jsonData data from excel
     * Created By: NQTruong (01/06/2023)
     */
    transformToTableData(jsonData) {
      try {
        const header = jsonData[this.header - 1].map((data) => ({
          label: data,
          prop: data,
        }));
        const headerRow = jsonData[this.header - 1];
        const transformedData = jsonData.slice(this.header).map((row) => {
          return headerRow.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });
        const tableData = { header: header, data: transformedData };
        console.log("tableData", tableData);
        return tableData;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Read excel file
     * Created By: NQTruong (01/06/2023)
     */
    readExcelFile() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = this.worksheets.find(
              (sheet) => sheet.value == this.selectedSheet
            ).label;
            const worksheet = workbook.Sheets[sheetName];
            if (!worksheet) {
              reject(
                new Error(`Sheet "${sheetName}" not found in the Excel file.`)
              );
              return;
            }
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log("json data: ", jsonData);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsArrayBuffer(this.uploadedFiles[0]);
      });
    },
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
    /**
     * sample file to upload
     * Created By: NQTruong (01/06/2023)
     */
    generateExcelAndUpload() {
      const data = [
        ["Name", "Age", "Email"],
        ["John Doe", 25, "john@example.com"],
        ["Jane Smith", 30, "jane@example.com"],
        ["Bob Johnson", 35, "bob@example.com"],
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const filename = "sample_excel.xlsx"; // Specify the desired filename here
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const file = new File([new Uint8Array(excelBuffer)], filename, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileList = [file];
      this.handleFiles(fileList);
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
  align-items: center;
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
.uploading-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}
.drop-description {
  color: gray;
}
</style>
