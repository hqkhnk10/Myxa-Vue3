<template>
    <div class="main__header">
        <div class="main__title">Danh hiệu thi đua </div>
        <div style="margin-bottom: 10px;justify-content: space-between;" class="flex">
            <div class="flex" style="gap:15px">
                <div>
                    <div class="form__items input-container" style="width: 300px;">
                        <input type="text" placeholder="Nhập mã hoặc tên danh hiệu ..." />
                        <span class="input__icon">
                            <image src="../../assets/icon/search-icon.svg" style="width: 20px;"></image>
                        </span>
                        <p class="error"></p>
                    </div>
                </div>
                <div class="flex">
                    <div class="dropdown">
                        <button class="button button__default button__dropdown" onclick="showDropdown()">
                            <div id="filter-icon" class="icon-margin-right icon__filter"></div>
                            <span style="font-weight: 400;">Bộ lọc</span>
                        </button>
                        <div class="dropdown-content">
                            <span class="custom-arrow" style="right: 58px;"></span>
                            <div class="dropdown__header">
                                <div class="dropdown__header-title">Lọc danh hiệu</div>
                                <button type="button" aria-label="Close" class="dialog__headerbtn" onclick="showDropdown()"
                                    style="height:15px">
                                    <img src="../../assets/icon/x-icon.svg" alt="Exit" style="width:15px" />
                                </button>
                            </div>
                            <div class="dropdown__body">
                                <form class="form" style="padding: 0;">
                                    <div class="form-item"><label class="form-item__label">Đối tượng
                                            khen thưởng</label>
                                        <div class="form-item__content">
                                            <div class="custom-select" style="width: 100%;">
                                                <div class="select__icon">
                                                    <img src="../../assets/icon/arrow-down.svg" alt="Arrow down">
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
                                                    <img src="../../assets/icon/arrow-down.svg" alt="arrow down">
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
                                                    <img src="../../assets/icon/arrow-down.svg" alt="Arrow down">
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
                                                    <img src="../../assets/icon/arrow-down.svg" alt="Arrow down">
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
                    <div class="filter-button">
                        <button class="button button__link hide" style="padding-left: 0;" id="remove-filter-button"
                            onclick="removeFilter()">Bỏ lọc</button>
                    </div>
                </div>
            </div>
            <div>
                <div id="add-title-button">
                    <button class="button button__primary" onclick="btnAddTitleOnClick()">
                        <img src="../../assets/icon/plus-icon.svg" alt="Plus icon" class="button__icon_pr6"
                            style="width: 17px;">
                        <span>Thêm danh hiệu</span>
                    </button>
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
    <div class="main__body">
        <div class="main__body-table">
            <table aria-describedby="table">
                <tr>
                    <th style="width: 50px;" class="sticky-col first-col">
                        <div class="checkbox">
                            <input type="checkbox" id="check-all">
                            <span class="checkmark checkmark__table-header"></span>
                        </div>
                    </th>
                    <th style="min-width: 200px">Tên danh hiệu thi đua</th>
                    <th style="min-width: 200px">Mã danh hiệu</th>
                    <th style="min-width: 200px">Đối tượng khen thưởng</th>
                    <th style="min-width: 200px">Cấp khen thưởng</th>
                    <th style="min-width: 200px">Loại phong trào</th>
                    <th style="min-width: 200px">Trạng thái</th>
                </tr>
                <tr>
                    <td class="sticky-col first-col">
                        <div class="checkbox">
                            <input type="checkbox" class="checkbox__input">
                            <span class="checkmark checkmark__table"></span>
                        </div>
                    </td>
                    <td>Lao động thi đua</td>
                    <td>LĐTT</td>
                    <td>Cá nhân</td>
                    <td>Cấp Xã/tương đương</td>
                    <td>Thường xuyên</td>
                    <td>
                        <div class="flex items-center" style="gap: 4px">
                            <div class="icon-round-active"></div>
                            <div>Sử dụng</div>
                        </div>
                    </td>
                    <td>
                        <div class="button__table">
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__pencil"></div>
                                    <span class="tooltiptext tooltiptext-top">Sửa</span>
                                </div>
                            </div>
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__threedots"></div>
                                    <span class="tooltiptext tooltiptext-top dropdown">Thêm
                                        nữa...</span>
                                    <div id="myDropdown" class="dropdown-content">
                                        <a style="color: #d2d2d2;">Sử dụng</a>
                                        <a>Ngưng sử dụng</a>
                                        <a style="color:red">Xóa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="sticky-col first-col">
                        <div class="checkbox">
                            <input type="checkbox" class="checkbox__input">
                            <span class="checkmark checkmark__table"></span>
                        </div>
                    </td>
                    <td>Lao động thi đua</td>
                    <td>LĐTT</td>
                    <td>Cá nhân</td>
                    <td>Cấp Xã/tương đương</td>
                    <td>Thường xuyên</td>
                    <td>
                        <div class="flex items-center" style="gap: 4px">
                            <div class="icon-round-active"></div>
                            <div>Sử dụng</div>
                        </div>
                    </td>
                    <td>
                        <div class="button__table">
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__pencil"></div>
                                    <span class="tooltiptext tooltiptext-top">Sửa</span>
                                </div>
                            </div>
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__threedots"></div>
                                    <span class="tooltiptext tooltiptext-top dropdown">Thêm
                                        nữa...</span>
                                    <div id="myDropdown" class="dropdown-content">
                                        <a style="color: #d2d2d2;">Sử dụng</a>
                                        <a>Ngưng sử dụng</a>
                                        <a style="color:red">Xóa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="sticky-col first-col">
                        <div class="checkbox">
                            <input type="checkbox" class="checkbox__input">
                            <span class="checkmark checkmark__table"></span>
                        </div>
                    </td>
                    <td>Lao động thi đua</td>
                    <td>LĐTT</td>
                    <td>Cá nhân</td>
                    <td>Cấp Xã/tương đương</td>
                    <td>Thường xuyên</td>
                    <td>
                        <div class="flex items-center" style="gap: 4px">
                            <div class="icon-round-active"></div>
                            <div>Sử dụng</div>
                        </div>
                    </td>
                    <td>
                        <div class="button__table">
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__pencil"></div>
                                    <span class="tooltiptext tooltiptext-top ">Sửa</span>
                                </div>
                            </div>
                            <div class="button-icon-table">
                                <div class="tooltip">
                                    <div class="icon__threedots"></div>
                                    <span class="tooltiptext  tooltiptext-top dropdown">Thêm
                                        nữa...</span>
                                    <div id="myDropdown" class="dropdown-content">
                                        <a style="color: #d2d2d2;">Sử dụng</a>
                                        <a>Ngưng sử dụng</a>
                                        <a style="color:red">Xóa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

        </div>
        <div class="main__body-pagination">
            <div>Tổng số: <span style="font-weight: 700;">3</span> bản ghi</div>
            <div class="flex" style="gap:10px">
                <div class="flex items-center">Số bản ghi/trang</div>
                <div>
                    <div class="custom-select" style="width: 90px;">
                        <div class="select__icon">
                            <img src="../../assets/icon/arrow-down.svg" alt="Arrow down">
                        </div>
                        <select>
                            <option value="0" selected></option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center">1 - 10 bản ghi</div>
                <div class="flex items-center">
                    <div class="icon__leftarrow"></div>
                </div>
                <div class="flex items-center">
                    <div class="icon__rightarrow"></div>
                </div>
            </div>
        </div>
    </div>
</template>