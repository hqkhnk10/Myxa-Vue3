<template>
    <div class="dialog__body">
        <form class="form" style="padding: 0;" id="form-add-title" ref="misaForm">
            <div class="form-item"><label class="form-item__label">Tên danh hiệu thi đua<span
                        class="required">*</span></label>
                <div class="form-item__content">
                    <misa-input ref="firstInput" v-model="form.EmulationTitleName" label="Tên danh hiệu thi đua" required
                        id="first-input" :isValid="validate.EmulationTitleName.valid" type="text" autocomplete="off"
                        class="input" style="width: 100%;" placeholder="Nhập danh hiệu thi đua"></misa-input>
                    <div class="error active" v-if="!validate.EmulationTitleName.valid">{{
                        validate.EmulationTitleName.message }}</div>
                </div>
            </div>
            <div class="form-item" style="display: flex;gap: 10px;">
                <div style="flex:1">
                    <label class="form-item__label">Mã danh hiệu<span class="required">*</span></label>
                    <div class="form-item__content">
                        <misa-input v-model="form.EmulationTitleCode" label="Mã danh hiệu" required type="text"
                            style="min-width: 0;width: 100%;"></misa-input>
                        <div class="error"></div>
                    </div>
                </div>
                <div style="flex:1">
                    <label class="form-item__label">Đối tượng khen thưởng</label>
                    <div class="form-item__content flex items-center">
                        <misa-checkbox v-model="form.ApplyObject2" style="flex:1">Cá nhân</misa-checkbox>
                        <misa-checkbox v-model="form.ApplyObject0" style="flex:1">Tập thể</misa-checkbox>
                    </div>
                </div>
            </div>
            <div class="form-item" style="display: flex;gap: 10px;">
                <div style="flex:1">
                    <label class="form-item__label">Cấp khen thưởng<span class="required">*</span></label>
                    <div class="form-item__content">
                        <misa-combobox v-model="form.CommendationLevel" :options="levelOptions"></misa-combobox>
                    </div>
                </div>
                <div style="flex:1">
                    <label class="form-item__label">Loại phong trào áp dụng</label>
                    <div class="form-item__content flex items-center">
                        <misa-checkbox v-model="form.MovementType0" style="flex:1">Thường xuyên</misa-checkbox>
                        <misa-checkbox v-model="form.MovementType1" style="flex:1">Theo đợt</misa-checkbox>
                    </div>
                </div>
            </div>
            <div class="form-item"><label class="form-item__label">Ghi chú</label>
                <div class="form-item__content">
                    <textarea v-model="form.note" class="textarea" placeholder="Nhập ghi chú"
                        style="resize: none;"></textarea>
                </div>
            </div>
            <div class="form-item" v-if="type == this.$enum.FormActions.Edit">
                <label class="form-item__label">Trạng thái</label>
                <div class="form-item__content flex" style="gap: 12px;">
                    <!-- TODO: MisaRadio -->
                    <div class="radio__container" @click="form.Inactive = 0">
                        <span>Sử dụng</span>
                        <input v-model="form.Inactive" type="radio" :value="0" :checked="form.Inactive == 0">
                        <span class="radio__checkmark"></span>
                    </div>
                    <div class="radio__container" @click="form.Inactive = 1">
                        <span>Ngưng sử dụng</span>
                        <input v-model="form.Inactive" type="radio" :value="1" :checked="form.Inactive == 1">
                        <span class="radio__checkmark"></span>
                    </div>
                </div>
            </div>
            <div class="form__footer">
                <button class="button button__secondary" type="button" @click="closeDialog()">
                    <span>Hủy</span>
                </button>
                <div class="flex" style="gap:12px" v-if="type == this.$enum.FormActions.Add">
                    <button class="button button__primary-border" type="button" @click="submitForm()">
                        <span>Lưu & thêm mới</span>
                    </button>
                    <button class="button button__primary" type="button" @click="submitForm()">
                        <span>Lưu</span>
                    </button>
                </div>
                <div v-if="type == this.$enum.FormActions.Edit">
                    <misa-button type="primary" @click="submitForm()">Lưu thay đổi</misa-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { required } from '@/js/validate/validate';

//TODO: MisaForm
export default {
    name: 'EmulationFormDialog',
    props: {
        formValue: {
            type: Object
        },
        type: {
            type: String,
            default: 'Add'
        }
    },
    data() {
        return {
            dialogAdd: false,
            typeForm: this.type,
            form: this.formValue,
            validate: {
                EmulationTitleName: {
                    validator: required, trigger: 'change', message: 'Không được để trống', valid: true
                }
            },
            levelOptions: [
                {
                    label: 'Tất cả',
                    value: null
                }, {
                    label: 'Cấp nhà nước',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapNhaNuoc
                }, {
                    label: 'Cấp Tỉnh/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapTinh
                }, {
                    label: 'Cấp Huyện/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapHuyen
                }, {
                    label: 'Cấp Xã/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapXa
                },
            ],
        }
    },
    mounted() {
        /**
         * Focus first input
         */
        this.$refs.firstInput.focus()
    },
    methods: {
        //close dialog
        closeDialog() {
            this.emitter.emit("toggle-emulation-dialog", false);
        },
        /**
         * Validate form if this.validate has value 
         * Validte contains validate function
         */
        validateForm() {
            let isValid = true;
            Object.keys(this.validate).forEach(item => {
                const valid = this.validate[item].validator(this.form[item]);
                this.validate[item].valid = valid;
                isValid = isValid && valid;
            });
            return isValid;
        },
        /**
         * Check validate before submit
         * if type == add then call add function
         * if type == edit then call edit function
         */
        submitForm() {
            if (this.validateForm()) {
                switch (this.type) {
                    case this.$enum.FormActions.Add:
                        this.addEmulation();
                        break;
                    case this.$enum.FormActions.Edit:
                        this.editEmulation();
                        break;
                }
                this.closeDialog();
            }
        },
        customFormValue() {
            let customValue = { ...this.formValue }
            const { ApplyObject2, ApplyObject0, MovementType0, MovementType1 } = this.formValue;
            const { ApplyObject, MovementType } = this.$enum.EmulationTitle;
            if (ApplyObject2) {
                customValue.ApplyObject = ApplyObject.Person
            }
            if (ApplyObject0) {
                customValue.ApplyObject = ApplyObject.Organization
            }
            if (MovementType0) {
                customValue.MovementType = MovementType.Sometimes
            }
            if (MovementType1) {
                customValue.MovementType = MovementType.Period
            }
            console.log('custom', customValue);
            return customValue
        },
        /**
         * Add emulation
         */
        addEmulation() {
            this.emitter.emit("add-table-emulation", this.customFormValue());
        },
        /**
         * Edit emulation
         */
        editEmulation() {
            this.emitter.emit("edit-table-emulation", this.customFormValue());
        }
    },
}
</script>