<template>
    <div class="main__header">
        <div class="main__title">Danh hiệu thi đua </div>
        <div class="main__title-filter">
            <div class="flex gap-12px">
                <misa-input v-model="keyword" class="main__title-input" placeholder="Nhập mã hoặc tên danh hiệu ..."
                    @keydown.enter="search">
                    <template #icon>
                        <span class="input__icon">
                            <img src="@/assets/icon/search-icon.svg" alt="search" width="25" height="25" />
                        </span>
                    </template>
                </misa-input>
                <div class="flex">
                    <EmulationDropdownFilter :filterValue="filterValue" @change-filter="changeFilter" />
                </div>
            </div>
            <div>
                <div v-if="selectedRows && selectedRows.length > 0" class="flex items-center gap-4px">
                    <div>Đã chọn<span class="main__title-tableCount">{{
                        selectedRows.length }}</span>
                    </div>
                    <div><misa-button type="link" @click="unSelectedRows()">Bỏ
                            chọn</misa-button>
                    </div>
                    <div><button class="button button__primary-border">Sử dụng</button></div>
                    <div><button class="button button__secondary">Ngưng sử dụng</button></div>
                    <div><misa-button type="warning-border" @click="removeRow">Xóa</misa-button></div>
                </div>
                <div v-else>
                    <misa-button type="primary" @click="openDialogAddTitle"> <img src="@/assets/icon/plus-icon.svg"
                            alt="Plus icon" class="button__icon_pr6" width="17">
                        <span>Thêm danh hiệu</span></misa-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmulationDropdownFilter from './EmulationDropdownFilter.vue';
export default {
    name: 'EmulationHeader',
    components: {
        EmulationDropdownFilter
    },
    data() {
        return {
            filterValue: {
                ApplyObject: null,
                CommendationLevel: null,
                MovementType: null,
                Inactive: null,
            },
            keyword: ''
        }
    },
    props: {
        selectedRows: {
            type: Object,
        }
    },
    methods: {
        //Lọc dữ liệu theo keyword
        search() {
            this.emitter.emit("search-table-emulation", this.keyword);
        },
        //Lọc dữ liệu theo Thẻ lọc
        changeFilter(value) {
            const { ApplyObject, CommendationLevel, MovementType, Inactive } = value;
            this.filterValue = { ApplyObject, CommendationLevel, MovementType, Inactive };
            this.emitter.emit("filter-table-emulation", this.filterValue);
        },
        //Bỏ chọn trong table
        unSelectedRows() {
            this.emitter.emit("unselect-row-emulation");
        },
        //Xóa dữ liệu trong table
        removeRow() {
            this.emitter.emit("remove-row-emulation");
        },
        //mở form thêm sửa
        openDialogAddTitle() {
            this.emitter.emit("toggle-emulation-dialog", true);
        },
        //đóng form thêm sửa
        closeDialogAdd() {
            this.emitter.emit("toggle-emulation-dialog", false);
        }
    },
}
</script>