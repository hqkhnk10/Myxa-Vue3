<template>
  <div class="main__header">
    <div class="main__title">{{ t("emulationTitle.emulationTitle") }}</div>
    <div class="main__title-filter">
      <div class="flex gap-12px">
        <misa-input
          v-model="keyword"
          width="250px"
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
                width="25"
                height="25"
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
      <div>
        <div
          v-if="selectedRows && selectedRows.length > 0"
          class="flex items-center gap-4px"
        >
          <div>
            {{ t('reuse.selected') }}<span class="main__title-tableCount">{{
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
      </div>
    </div>
  </div>
  <misa-confirm-dialog v-if="confirmDialog" v-model="confirmDialog" title="Xóa Danh hiệu thi đua">
    <template #content>
      <div>
        {{ t('reuse.remove') }}
        <span style="font-weight: bold"
          >{{ selectedRows.length }} {{ t('emulationTitle.title') }}
        </span>
        {{ t('emulationTitle.selected') }}?
      </div>
    </template>
    <template #button>
      <misa-button type="secondary" @click="closeConfirmDialog"
        >{{ t('reuse.no') }}</misa-button
      >
      <misa-button type="danger" @click="removeRow">{{ t('emulationTitle.removeEmulationTitle') }}</misa-button>
    </template>
  </misa-confirm-dialog>
</template>

<script>
import EmulationDropdownFilter from "./EmulationDropdownFilter.vue";
import { useEmulationTitleStore } from "@/store/emulationTitle";
import { mapActions } from "pinia";
import { dispatchNotification } from "@/components/Notification";
import {formatNumber} from "@/js/format/format"
export default {
  name: "EmulationHeader",
  components: {
    EmulationDropdownFilter,
  },
  setup(){
    return {
      formatNumber
    }
  },
  data() {
    return {
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
  methods: {
    /**
     * Get function from pinia
     */
    ...mapActions(useEmulationTitleStore, [
      "updateMultipleStatusAPI",
      "getAPI",
      "deleteMultipleAPI"
    ]),

    /**
     * Call update status api
     */
    updateStatus(status) {
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
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        });
    },
    /**
     * open confirm dialog before delete row
         //Created At: 10/05/2023
    //@author QTNgo
     */
    openConfirmDialog() {
      this.confirmDialog = true;
    },
    /**
     * close confirm dialog 
         //Created At: 10/05/2023
    //@author QTNgo
     */
    closeConfirmDialog() {
      this.confirmDialog = false;
    },
    /**
     * Send keyword to GetAPI to filter
     * @param {*} keyword 
         //Created At: 10/05/2023
    //@author QTNgo
     */
    changeKeyword(keyword) {
      this.emitter.emit("search-table-emulation", keyword);
    },
    //Lọc dữ liệu theo keyword
    //Created At: 10/05/2023
    //@author QTNgo
    search() {
      this.emitter.emit("search-table-emulation", this.keyword);
    },
    //Lọc dữ liệu theo Thẻ lọc
    //Created At: 10/05/2023
    //@author QTNgo
    changeFilter(value) {
      this.filterValue = { ...value };
      this.emitter.emit("filter-table-emulation", this.filterValue);
    },
    //Bỏ chọn trong table
    //Created At: 10/05/2023
    //@author QTNgo
    unSelectedRows() {
      this.emitter.emit("unselect-row-emulation");
    },
    /**
     * Remove rows if selected
     * Created At: 10/05/2023
     * @author QTNgo
     */
    removeRow() {
      this.closeConfirmDialog();
      const listId = this.selectedRows.map((row) => row.emulationTitleID);
      this.deleteMultipleAPI({ id: listId })
        .then(() => {
          dispatchNotification({
            content: this.t("reuse.deleteSuccess"),
            type: "success",
          });
          this.getAPI();
          this.unSelectedRows();
        })
        .catch((err) => {
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        });
    },
    //mở form thêm sửa
    //Created At: 10/05/2023
    //@author QTNgo
    openDialogAddTitle() {
      this.emitter.emit("toggle-emulation-dialog", true);
    },
    //đóng form thêm sửa
    //Created At: 10/05/2023
    //@author QTNgo
    closeDialogAdd() {
      this.emitter.emit("toggle-emulation-dialog", false);
    },
  },
};
</script>
