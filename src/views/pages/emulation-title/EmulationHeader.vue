<template>
  <div class="main__header">
    <div class="main__title">{{ t("emulationTitle.emulationTitle") }}</div>
    <div class="main__title-filter">
      <div class="flex gap-12px">
        <misa-input
          v-model="keyword"
          width="250px"
          :reset="true"
          placeholder="Nhập mã hoặc tên danh hiệu ..."
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
            Đã chọn<span class="main__title-tableCount">{{
              selectedRows.length
            }}</span>
          </div>
          <div>
            <misa-button type="link" @click="unSelectedRows()">{{
              t("reuse.removeSelection")
            }}</misa-button>
          </div>
          <div>
            <button class="button button__primary-border">
              {{ t("reuse.using") }}
            </button>
          </div>
          <div>
            <button class="button button__secondary">
              {{ t("reuse.shutdown") }}
            </button>
          </div>
          <div>
            <misa-button type="warning-border" @click="removeRow">{{
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
            <span>{{
              t("emulationTitle.addEmulationTitle")
            }}</span></misa-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmulationDropdownFilter from "./EmulationDropdownFilter.vue";
export default {
  name: "EmulationHeader",
  components: {
    EmulationDropdownFilter,
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
    };
  },
  props: {
    selectedRows: {
      type: Object,
    },
  },
  methods: {
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
      const { ApplyObject, CommendationLevel, MovementType, Inactive } = value;
      this.filterValue = {
        ApplyObject,
        CommendationLevel,
        MovementType,
        Inactive,
      };
      this.emitter.emit("filter-table-emulation", this.filterValue);
    },
    //Bỏ chọn trong table
    //Created At: 10/05/2023
    //@author QTNgo
    unSelectedRows() {
      this.emitter.emit("unselect-row-emulation");
    },
    //Xóa dữ liệu trong table
    //Created At: 10/05/2023
    //@author QTNgo
    removeRow() {
      this.emitter.emit("remove-row-emulation");
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
