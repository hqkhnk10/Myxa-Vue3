<template>
  <div class="upload-dialog">
    <div
      class="drop-area"
      :class="{ 'drop-hover': isDropHover }"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="isDropHover = true"
      @dragleave.prevent="isDropHover = false"
      @drop.prevent="handleDrop"
    >
      <span>Drag and drop files here</span>
      <ul v-if="uploadedFiles.length">
        <li v-for="(file, index) in uploadedFiles" :key="index">
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
            <button class="change-file-btn" @click="changeFile(index)">
              Change File
            </button>
          </div>
        </li>
      </ul>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept=".xlsx"
      multiple
      style="display: none"
      @change="handleFileInputChange"
    />
    <div class="sheet-selection" v-if="worksheets.length">
      <h3>Select sheets to import:</h3>
      <label v-for="worksheet in worksheets" :key="worksheet.name">
        <input
          type="checkbox"
          :value="worksheet.name"
          v-model="selectedSheets"
        />
        {{ worksheet.name }}
      </label>
    </div>
    <button @click="openFileInput">Choose File</button>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: "UploadExcel",
  data() {
    return {
      uploadedFiles: [],
      isDropHover: false,
      selectedSheets: [],
      worksheets: [],
    };
  },
  methods: {
    handleDragOver(event) {
      event.dataTransfer.dropEffect = "copy";
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDropHover = false;
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    handleFileInputChange(event) {
      const files = event.target.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          this.uploadedFiles.push(file);
          this.loadWorksheets(file);
        }
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    loadWorksheets(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        this.worksheets = workbook.SheetNames.map((sheetName) => ({
          name: sheetName,
          selected: false,
        }));
      };

      reader.readAsArrayBuffer(file);
    },
    formatFileSize(fileSize) {
      const fileSizeInMB = fileSize / (1024 * 1024);
      return fileSizeInMB.toFixed(2) + " MB";
    },
    changeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
  },
};
</script>

<style>
.upload-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 2px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.drop-area.drop-hover {
  border-color: blue;
}

.drop-area span {
  display: block;
  margin-top: 10px;
}

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.file-name {
  flex: 1;
}

.file-size {
  margin-right: 10px;
}

.change-file-btn {
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
</style>
