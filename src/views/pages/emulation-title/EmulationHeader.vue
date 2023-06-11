<template>
  <div class="main__header">
    <div class="main__title">{{ t("emulationTitle.emulationTitle") }}</div>
    <div class="main__title-filter">
      <div class="flex gap-12px">
        <misa-input
          v-model="keyword"
          width="265px"
          :reset="true"
          :placeholder="t('emulationTitle.enterEmulationTitleNameOrCode')"
          @keydown.enter="search"
          @debounce="changeKeyword"
        >
          <template #icon>
            <span class="input__icon">
              <img
                src="@/assets/icon/search-icon.svg"
                alt="search"
                width="20"
                height="20"
              />
            </span>
          </template>
        </misa-input>
        <div class="flex">
          <EmulationDropdownFilter
            :filterValue="filterValue"
            @change-filter="changeFilter"
          />
        </div>
      </div>
      <div class="header-button-end">
        <div
          v-if="selectedRows && selectedRows.length > 0"
          class="flex items-center gap-4px"
        >
          <div>
            {{ t("reuse.selected")
            }}<span class="main__title-tableCount">{{
              formatNumber(selectedRows.length)
            }}</span>
          </div>
          <div>
            <misa-button type="link" @click="unSelectedRows()">{{
              t("reuse.removeSelection")
            }}</misa-button>
          </div>
          <div>
            <misa-button type="primary-border" @click="updateStatus(0)">
              {{ t("reuse.use") }}
            </misa-button>
          </div>
          <div>
            <misa-button type="secondary" @click="updateStatus(1)">
              {{ t("reuse.shutdown") }}
            </misa-button>
          </div>
          <div>
            <misa-button type="warning-border" @click="openConfirmDialog">{{
              t("reuse.remove")
            }}</misa-button>
          </div>
        </div>
        <div v-else>
          <misa-button type="primary" @click="openDialogAddTitle">
            <img
              src="@/assets/icon/plus-icon.svg"
              alt="Plus icon"
              class="button__icon_pr6"
              width="17"
            />
            <span>{{ t("emulationTitle.addEmulation") }}</span></misa-button
          >
        </div>
        <div>
          <misa-dropdown
            :header="false"
            position="right"
            v-model="showImportDropdown"
            :arrow="false"
          >
            <template #click>
              <misa-button type="secondary" @click="toogleDropdownEdit">
                <div class="icon__threedots"></div>
              </misa-button>
            </template>
            <template #content>
              <a class="cursor-pointer" @click="onBtnClickImport">{{
                t("reuse.import")
              }}</a>
              <a class="cursor-pointer" @click="onBtnClickExport">{{
                t("reuse.export")
              }}</a>
            </template>
          </misa-dropdown>
        </div>
      </div>
    </div>
  </div>
  <misa-confirm-dialog
    v-if="confirmDialog"
    v-model="confirmDialog"
    title="Xóa Danh hiệu thi đua"
    @keydown.enter="removeRow"
  >
    <template #content>
      <div>
        {{ t("reuse.remove") }}
        <span style="font-weight: bold"
          >{{ selectedRows.length }} {{ t("emulationTitle.title") }}
        </span>
        {{ t("emulationTitle.selected") }}?
      </div>
    </template>
    <template #button>
      <misa-button type="secondary" @click="closeConfirmDialog">{{
        t("reuse.no")
      }}</misa-button>
      <misa-button type="danger" @click="removeRow">{{
        t("emulationTitle.removeEmulationTitle")
      }}</misa-button>
    </template>
  </misa-confirm-dialog>
  <misa-upload
    v-if="uploadDialog"
    v-model="uploadDialog"
    @import-data="importFile"
    :keys="$enum.Keys.EmulationTitle"
    :fileName="t('emulationTitle.emulationTitle')"
  ></misa-upload>
</template>

<script>
import EmulationDropdownFilter from "./EmulationDropdownFilter.vue";
import { useEmulationTitleStore } from "@/store/emulationTitle";
import { mapActions, mapState } from "pinia";
import { dispatchNotification } from "@/components/Notification";
import { formatNumber } from "@/js/format/format";
import { exportFile } from "@/api/file";
import { saveFileToClient } from "@/js/helper/exportExcel";
import { insertMultipleEmulationTitle } from "@/api/emulationTitle";
export default {
  name: "EmulationHeader",
  components: {
    EmulationDropdownFilter,
  },
  setup() {
    return {
      formatNumber,
    };
  },
  data() {
    return {
      showImportDropdown: false,
      uploadDialog: false,
      filterValue: {
        ApplyObject: null,
        CommendationLevel: null,
        MovementType: null,
        Inactive: null,
      },
      keyword: "",
      confirmDialog: false,
    };
  },
  props: {
    selectedRows: {
      type: Object,
      description:
        "Những rows đang được chọn, được truyền từ EmulationTItleIndex.vue",
    },
  },
  computed: {
    /**
     * Lưu dữ liệu trong store vào table
     * Created By: NQTruong (20/05/2023)
     */
    ...mapState(useEmulationTitleStore, {
      table: (store) => {
        return {
          header: store.header,
          data: store.data,
        };
      },
    }),
    /**
     * Lấy dữ liệu parameters trong store
     * Created By: NQTruong (20/05/2023)
     */
    ...mapState(useEmulationTitleStore, ["parameters"]),
  },
  emits: ["loading"],
  methods: {
    /**
     * Đóng/bật dropdown xuất nhập khẩu
     * Created By: NQTruong (20/05/2023)
     */
    toogleDropdownEdit() {
      this.showImportDropdown = !this.showImportDropdown;
    },
    /**
     * Thêm dữ liệu đã nhập khẩu xuống server
     * @param {*} data
     * Created By: NQTruong (20/05/2023)
     */
    importFile(data) {
      this.$emit("loading", true);
      insertMultipleEmulationTitle(data?.validData)
        .then(() => {
          dispatchNotification({
            content: this.t("reuse.importSuccess"),
            type: "success",
          });
          this.uploadDialog = false;
          this.getAPI();
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },
    /**
     * Ấn nút nhập khẩu
     * Created By: NQTruong (20/05/2023)
     */
    onBtnClickImport() {
      this.uploadDialog = true;
      this.toogleDropdownEdit();
    },
    /**
     * Ấn nút xuất khẩu
     * Created By: NQTruong (20/05/2023)
     */
    onBtnClickExport() {
      this.$emit("loading", true);
      this.toogleDropdownEdit();
      exportFile({
        key: this.$enum.Keys.EmulationTitle,
        parameters: this.parameters,
      })
        .then((res) => {
          saveFileToClient("Danh hiệu thi đua", res);
          dispatchNotification({
            content: this.t("reuse.exportSuccess"),
            type: "success",
          });
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },
    /**
     * Get function from pinia
     * Created By: NQTruong (20/05/2023)
     */
    ...mapActions(useEmulationTitleStore, [
      "updateMultipleStatusAPI",
      "getAPI",
      "deleteMultipleAPI",
    ]),

    /**
     * Call update status api
     * Created By: NQTruong (20/05/2023)
     */
    updateStatus(status) {
      this.$emit("loading", true);

      this.updateMultipleStatusAPI({
        id: this.selectedRows.map((row) => row.emulationTitleID),
        inactive: status,
      })
        .then(() => {
          dispatchNotification({
            content: this.t("reuse.editSuccess"),
            type: "success",
          });
          this.getAPI();
          this.unSelectedRows();
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },
    /**
     * open confirm dialog before delete row
     * Created At: 10/05/2023
     * @author NQTruong
     */
    openConfirmDialog() {
      this.confirmDialog = true;
    },
    /**
     * close confirm dialog
     *Created At: 10/05/2023
     *@author NQTruong
     */
    closeConfirmDialog() {
      this.confirmDialog = false;
    },
    /**
     * Send keyword to GetAPI to filter
     * @param {*} keyword
     * Created At: 10/05/2023
     * @author NQTruong
     */
    changeKeyword(keyword) {
      this.emitter.emit("search-table-emulation", keyword);
    },
    //Lọc dữ liệu theo keyword
    //Created At: 10/05/2023
    //@author NQTruong
    search() {
      this.emitter.emit("search-table-emulation", this.keyword);
    },
    //Lọc dữ liệu theo Thẻ lọc
    //Created At: 10/05/2023
    //@author NQTruong
    changeFilter(value) {
      this.filterValue = { ...value };
      this.emitter.emit("filter-table-emulation", this.filterValue);
    },
    //Bỏ chọn trong table
    //Created At: 10/05/2023
    //@author NQTruong
    unSelectedRows() {
      this.emitter.emit("unselect-row-emulation");
    },
    /**
     * Remove rows if selected
     * Created At: 10/05/2023
     * @author NQTruong
     */
    removeRow() {
      this.closeConfirmDialog();
      const listId = this.selectedRows.map((row) => row.emulationTitleID);
      this.$emit("loading", true);
      this.deleteMultipleAPI({ id: listId })
        .then(() => {
          dispatchNotification({
            content: this.t("reuse.deleteSuccess"),
            type: "success",
          });
          this.getAPI();
          this.unSelectedRows();
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },
    //mở form thêm sửa
    //Created At: 10/05/2023
    //@author NQTruong
    openDialogAddTitle() {
      this.emitter.emit("toggle-emulation-dialog", true);
    },
    //đóng form thêm sửa
    //Created At: 10/05/2023
    //@author NQTruong
    closeDialogAdd() {
      this.emitter.emit("toggle-emulation-dialog", false);
    },
  },
};
</script>
<style scoped>
.header-button-end {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
