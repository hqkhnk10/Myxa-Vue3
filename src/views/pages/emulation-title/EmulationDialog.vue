<template>
    <misa-dialog v-model="dialogAdd" title="Thêm danh hiệu thi đua" width="60%" top="10vh">
        <div class="dialog__body">
            <form class="form" style="padding: 0;" id="form-add-title">
                <div class="form-item"><label class="form-item__label">Tên danh hiệu thi đua<span
                            class="required">*</span></label>
                    <div class="form-item__content">
                        <input label="Tên danh hiệu thi đua" required id="first-input" type="text" autocomplete="off"
                            class="input" style="width: 100%;" placeholder="Nhập danh hiệu thi đua">
                        <div class="error">123</div>
                    </div>
                </div>
                <div class="form-item" style="display: flex;gap: 10px;">
                    <div style="flex:1">
                        <label class="form-item__label">Mã danh hiệu<span class="required">*</span></label>
                        <div class="form-item__content">
                            <input label="Mã danh hiệu" required type="text" style="min-width: 0;width: 100%;">
                            <div class="error">123</div>
                        </div>
                    </div>
                    <div style="flex:1">
                        <label class="form-item__label">Đối tượng khen thưởng</label>
                        <div class="form-item__content flex items-center">
                            <misa-checkbox>Cá nhân</misa-checkbox>
                            <misa-checkbox>Tập thể</misa-checkbox>
                        </div>
                    </div>
                </div>
                <div class="form-item" style="display: flex;gap: 10px;">
                    <div style="flex:1">
                        <label class="form-item__label">Cấp khen thưởng<span class="required">*</span></label>
                        <div class="form-item__content">
                            <misa-combobox></misa-combobox>
                        </div>
                    </div>
                    <div style="flex:1">
                        <label class="form-item__label">Loại phong trào áp dụng</label>
                        <div class="form-item__content flex items-center">
                            <misa-checkbox>Thường xuyên</misa-checkbox>
                            <misa-checkbox>Theo đợt</misa-checkbox>
                        </div>
                    </div>
                </div>
                <div class="form-item"><label class="form-item__label">Ghi chú</label>
                    <div class="form-item__content">
                        <textarea class="textarea" placeholder="Nhập ghi chú" style="resize: none;"></textarea>
                    </div>
                </div>
                <div class="form__footer">
                    <button class="button button__secondary" type="button" onclick="btnAddTitleOnClick()">
                        <span>Hủy</span>
                    </button>
                    <button class="button button__primary-border" type="button" onclick="submitAddTitle()">
                        <span>Lưu & thêm mới</span>
                    </button>
                    <button class="button button__primary" type="button" onclick="submitAddTitle()">
                        <span>Lưu</span>
                    </button>
                </div>
            </form>
        </div>
    </misa-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogAdd: false
        }
    },
}
</script>

<style></style>