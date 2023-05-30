<template>
  <div class="upload-dialog">
    Nhập khẩu
    <div
      class="drop-area"
      :class="{ 'drop-hover': isDropHover }"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="isDropHover = true"
      @dragleave.prevent="isDropHover = false"
      @dragove.prevent="isDropHover = true"
      @drop.prevent="handleDrop"
      @click="openFileInput"
    >
      <span v-if="uploadedFiles.length == 0">Drag and drop files here</span>
      <ul v-if="uploadedFiles.length">
        <li v-for="(file, index) in uploadedFiles" :key="index">
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
            <button @click="openFileInput">Change File</button>
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
      <div>
        <h3>Select sheets to import:</h3>
      <misa-combobox v-model="sheetName" :options="worksheets"></misa-combobox>
      </div>
      <div>
        <h3>Header:</h3>
        <misa-input v-model="header" type="number"></misa-input>
      </div>
    </div>
    <div class="upload__button">
      <misa-button @click="uploadFile">Continue</misa-button>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: "UploadExcel",
  data() {
    return {
      header: 1,
      uploadedFiles: [],
      isDropHover: false,
      worksheets: [],
      data: [],
      sheetName: ''
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
      if (this.uploadedFiles.length > 0) {
        return;
      }
      this.handleFiles(files);
    },
    handleFileInputChange(event) {
      this.isDropHover = false
      const files = event.target.files;
      this.handleFiles(files);
    },
    async handleFiles(files) {
      console.log('files: ' ,files);
      if (this.uploadedFiles.length > 0 && files) {
        this.uploadedFiles.pop();
      }
      const file = files[0];
      if (
        file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.size < (1024 * 1024)
      ) {
        this.uploadedFiles.push(file);
        this.loadWorksheets(file);
      }
    },
    openFileInput() {
      this.isDropHover = true
      this.$refs.fileInput.click();
    },
    loadWorksheets(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        this.worksheets = workbook.SheetNames.map((sheetName,index) => ({
          label: sheetName,
          value: index
        }))
      }

      reader.readAsArrayBuffer(file)
    },
    uploadFile() {
      const selectedSheetNames = this.selectedSheets.map((sheet) => sheet.value)
      const workbook = XLSX.read(this.fileContent, { type: 'binary' })

      const importedData = []

      selectedSheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })

        // Remove empty rows
        const filteredData = data.filter((row) => row.join('').trim() !== '')

        // Convert the data into an array of objects
        const sheetData = filteredData.map((row) =>
          row.reduce((obj, cell, index) => {
            const columnHeader = data[0][index] // Assume the first row contains column headers
            obj[columnHeader] = cell
            return obj
          }, {})
        )

        importedData.push(...sheetData)
      })

      this.importedData = importedData
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
  cursor: pointer;
  display: flex;
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
