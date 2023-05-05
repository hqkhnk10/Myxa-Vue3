<template>
      <div class="main__header">
        <div class="main__title">Danh hiệu thi đua </div>
        <div style="margin-bottom: 10px;justify-content: space-between;" class="flex">
            <div class="flex" style="gap:15px">
                <misa-input></misa-input>
                <div class="flex">
                    <div class="dropdown">
                        <misa-button type="secondary">
                            <div id="filter-icon" class="icon-margin-right icon__filter"></div>
                            <span style="font-weight: 400;">Bộ lọc</span>
                        </misa-button>
                        <div class="dropdown-content">
                            <span class="custom-arrow" style="right: 58px;"></span>
                            <div class="dropdown__header">
                                <div class="dropdown__header-title">Lọc danh hiệu</div>
                                <button type="button" aria-label="Close" class="dialog__headerbtn" onclick="showDropdown()"
                                    style="height:15px">
                                    <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width:15px" />
                                </button>
                            </div>
                            <div class="dropdown__body">
                                <form class="form" style="padding: 0;">
                                    <div class="form-item"><label class="form-item__label">Đối tượng
                                            khen thưởng</label>
                                        <div class="form-item__content">
                                            <div class="custom-select" style="width: 100%;">
                                                <div class="select__icon">
                                                    <img src="@/assets/icon/arrow-down.svg" alt="Arrow down">
                                                </div>
                                                <select>
                                                    <option value="0">Select car:</option>
                                                    <option value="1">Tất cả</option>
                                                    <option value="2">Gia đình</option>
                                                    <option value="3">Tập thể</option>
                                                    <option value="4">Cá nhân</option>
                                                    <option value="5">Cá nhân và tập thể</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-item"><label class="form-item__label">Cấp khen
                                            thưởng</label>
                                        <div class="form-item__content">
                                            <div class="custom-select" style="width: 100%;">
                                                <div class="select__icon">
                                                    <img src="@/assets/icon/arrow-down.svg" alt="arrow down">
                                                </div>
                                                <select>
                                                    <option value="0">Select car:</option>
                                                    <option value="1">Tất cả</option>
                                                    <option value="2">Cấp nhà nước</option>
                                                    <option value="3">Cấp Tỉnh/tưởng đương</option>
                                                    <option value="4">Cấp Huyện/tưởng đương</option>
                                                    <option value="5">Cấp Xã/tưởng đương</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-item"><label class="form-item__label">Loại phong
                                            trào</label>
                                        <div class="form-item__content">
                                            <div class="custom-select" style="width: 100%;">
                                                <div class="select__icon">
                                                    <img src="@/assets/icon/arrow-down.svg" alt="Arrow down">
                                                </div>
                                                <select>
                                                    <option value="0">Select car:</option>
                                                    <option value="1">Tất cả</option>
                                                    <option value="2">Thường xuyên</option>
                                                    <option value="3">Theo đợt</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-item"><label class="form-item__label">Trạng
                                            thái</label>
                                        <div class="form-item__content">
                                            <div class="custom-select" style="width: 100%;">
                                                <div class="select__icon">
                                                    <img src="@/assets/icon/arrow-down.svg" alt="Arrow down">
                                                </div>
                                                <select>
                                                    <option value="0">Select car:</option>
                                                    <option value="1">Tất cả</option>
                                                    <option value="2">Sử dụng</option>
                                                    <option value="3">Ngưng sử dụng</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="dropdown__footer">
                                <button class="button button__secondary" type="button" onclick="showDropdown()">
                                    <span>Hủy</span>
                                </button>
                                <button class="button button__primary" type="button"
                                    onclick="showDropdown();changeFilterIcon()">
                                    <span>Áp dụng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <misa-button type="link" v-if="false" class="filter-button">
                        Bỏ lọc
                    </misa-button>
                </div>
            </div>
            <div>
                <div id="add-title-button">
                    <misa-button type="primary" @click="openDialogAddTitle"> <img src="@/assets/icon/plus-icon.svg"
                            alt="Plus icon" class="button__icon_pr6" style="width: 17px;">
                        <span>Thêm danh hiệu</span></misa-button>
                </div>
                <div id="crud-button-header" class="hide">
                    <div>Đã chọn<span id="row-selected-count" style="margin-left: 4px;font-weight: bold;"></span>
                    </div>
                    <div><button button class="button button__link" onclick="removeSelectedRow()">Bỏ
                            chọn</button>
                    </div>
                    <div><button class="button button__primary-border">Sử dụng</button></div>
                    <div><button class="button button__secondary">Ngưng sử dụng</button></div>
                    <div><button class="button button__warning-border">Xóa</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'EmulationHeader',
    methods: {
        openDialogAddTitle() {
            this.dialogAdd = true
        },
        closeDialogAdd() {
            this.dialogAdd = false
        }
    },
}
</script>