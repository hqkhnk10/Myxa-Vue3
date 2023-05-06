<template>
    <div class="main__header">
        <div class="main__title">Danh hiệu thi đua </div>
        <div style="margin-bottom: 10px;justify-content: space-between;" class="flex">
            <div class="flex" style="gap:15px">
                <misa-input style="width:250px" placeholder="Nhập mã hoặc tên danh hiệu ...">
                    <template #icon>
                        <span class="input__icon">
                            <img src="@/assets/icon/search-icon.svg" alt="search" width="25" height="25"/>
                        </span>
                    </template>
                </misa-input>
                <div class="flex">
                    <EmulationDropdownFilter />
                    <misa-button type="link" v-if="false" class="filter-button">
                        Bỏ lọc
                    </misa-button>
                </div>
            </div>
            <div>

                <div v-if="selectedRows && selectedRows.length > 0" class="flex items-center" style="gap:4px">
                    <div>Đã chọn<span id="row-selected-count" style="margin-left: 4px;font-weight: bold;">{{ selectedRows.length }}</span>
                    </div>
                    <div><button button class="button button__link" onclick="removeSelectedRow()">Bỏ
                            chọn</button>
                    </div>
                    <div><button class="button button__primary-border">Sử dụng</button></div>
                    <div><button class="button button__secondary">Ngưng sử dụng</button></div>
                    <div><button class="button button__warning-border">Xóa</button></div>
                </div>
                <div v-else>
                    <misa-button type="primary" @click="openDialogAddTitle"> <img src="@/assets/icon/plus-icon.svg"
                            alt="Plus icon" class="button__icon_pr6" style="width: 17px;">
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
    props:{
        selectedRows:{
            type: Object,
        }
    },
    components: {
        EmulationDropdownFilter
    },
    methods: {
        openDialogAddTitle() {
            this.emitter.emit("toggle-emulation-dialog", true);
        },
        closeDialogAdd() {
            this.emitter.emit("toggle-emulation-dialog", false);
        }
    },
}
</script>