<template>
  <div class="dialog__body">
    <form class="form" id="form-add-title" ref="misaForm">
      <div class="form-item">
        <label class="form-item__label"
          >{{ t("emulationTitle.emulationTitleName")
          }}<span class="required">*</span></label
        >
        <div class="form-item__content">
          <misa-input
            ref="firstInput"
            v-model="form.EmulationTitleName"
            label="Tên danh hiệu thi đua"
            required
            id="first-input"
            :isValid="validate.EmulationTitleName.valid"
            type="text"
            autocomplete="off"
            class="input w-full"
            placeholder="Nhập danh hiệu thi đua"
          ></misa-input>
          <div class="error active" v-if="!validate.EmulationTitleName.valid">
            {{ validate.EmulationTitleName.message }}
          </div>
        </div>
      </div>
      <div class="form-item form-item-flex">
        <div class="flex-1">
          <label class="form-item__label"
            >{{ t("emulationTitle.emulationTitleCode")
            }}<span class="required">*</span></label
          >
          <div class="form-item__content">
            <misa-input
              v-model="form.EmulationTitleCode"
              label="Mã danh hiệu"
              required
              type="text"
              class="w-full"
            ></misa-input>
            <div class="error"></div>
          </div>
        </div>
        <div class="flex-1">
          <label class="form-item__label">{{
            t("emulationTitle.applyObject")
          }}</label>
          <div class="form-item__content flex items-center">
            <misa-checkbox v-model="form.ApplyObject2" class="flex-1">{{
              t("emulationTitle.personal")
            }}</misa-checkbox>
            <misa-checkbox v-model="form.ApplyObject0" class="flex-1">{{
              t("emulationTitle.group")
            }}</misa-checkbox>
          </div>
        </div>
      </div>
      <div class="form-item form-item-flex">
        <div class="flex-1">
          <label class="form-item__label"
            >Cấp khen thưởng<span class="required">*</span></label
          >
          <div class="form-item__content">
            <misa-combobox
              v-model="form.CommendationLevel"
              :options="levelOptions"
            ></misa-combobox>
          </div>
        </div>
        <div class="flex-1">
          <label class="form-item__label">{{
            t("emulationTitle.movementType")
          }}</label>
          <div class="form-item__content flex items-center">
            <misa-checkbox v-model="form.MovementType0" class="flex-1">{{
              t("emulationTitle.regular")
            }}</misa-checkbox>
            <misa-checkbox v-model="form.MovementType1" class="flex-1">{{
              t("emulationTitle.period")
            }}</misa-checkbox>
          </div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item__label">{{ t("reuse.note") }}</label>
        <div class="form-item__content">
          <textarea
            v-model="form.note"
            class="textarea-resize"
            placeholder="Nhập ghi chú"
          ></textarea>
        </div>
      </div>
      <div class="form-item" v-if="type == this.$enum.FormActions.Edit">
        <label class="form-item__label">Trạng thái</label>
        <div class="form-item__content flex gap-12px">
          <!-- TODO: MisaRadio -->
          <div class="radio__container" @click="form.Inactive = 0">
            <span>{{ t("reuse.using") }}</span>
            <input
              v-model="form.Inactive"
              type="radio"
              :value="0"
              :checked="form.Inactive == 0"
            />
            <span class="radio__checkmark"></span>
          </div>
          <div class="radio__container" @click="form.Inactive = 1">
            <span>{{ t("reuse.shutdown") }}</span>
            <input
              v-model="form.Inactive"
              type="radio"
              :value="1"
              :checked="form.Inactive == 1"
            />
            <span class="radio__checkmark"></span>
          </div>
        </div>
      </div>
      <div class="form__footer">
        <button
          class="button button__secondary"
          type="button"
          @click="closeDialog()"
        >
          <span>{{ t("reuse.cancel") }}</span>
        </button>
        <div class="flex gap-12px" v-if="type == this.$enum.FormActions.Add">
          <button
            class="button button__primary-border"
            type="button"
            @click="submitForm()"
          >
            <span>{{ t("reuse.saveAndAdd") }}</span>
          </button>
          <button
            class="button button__primary"
            type="button"
            @click="submitForm()"
          >
            <span>{{ t("reuse.save") }}</span>
          </button>
        </div>
        <div v-if="type == this.$enum.FormActions.Edit">
          <misa-button type="primary" @click="submitForm()">{{
            t("saveChange")
          }}</misa-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "@/js/validate/validate";

//TODO: MisaForm
export default {
  name: "EmulationFormDialog",
  props: {
    formValue: {
      type: Object,
    },
    type: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      dialogAdd: false,
      typeForm: this.type,
      form: this.formValue,
      validate: {
        EmulationTitleName: {
          validator: required,
          trigger: "change",
          message: "Không được để trống",
          valid: true,
        },
      },
      levelOptions: [
        {
          label: this.t("reuse.all"),
          value: null,
        },
        {
          label: this.t("emulationTitle.countryLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapNhaNuoc,
        },
        {
          label: this.t("emulationTitle.provinceLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapTinh,
        },
        {
          label: this.t("emulationTitle.districtLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapHuyen,
        },
        {
          label: this.t("emulationTitle.communeLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapXa,
        },
      ],
    };
  },
  mounted() {
    /**
     * Focus first input
     * Created At: 10/05/2023
     * @author QTNgo
     */
    this.$refs.firstInput.focus();
  },
  methods: {
    //close dialog
    closeDialog() {
      this.emitter.emit("toggle-emulation-dialog", false);
    },
    /**
     * Validate form if this.validate has value
     * Validte contains validate function
     * Created At: 10/05/2023
     * @author QTNgo
     */
    validateForm() {
      let isValid = true;
      Object.keys(this.validate).forEach((item) => {
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
     * Created At: 10/05/2023
     * @author QTNgo
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
    /**
     * Handle Form value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    customFormValue() {
      let customValue = { ...this.formValue };
      const { ApplyObject2, ApplyObject0, MovementType0, MovementType1 } =
        this.formValue;
      const { ApplyObject, MovementType } = this.$enum.EmulationTitle;
      if (ApplyObject2) {
        customValue.ApplyObject = ApplyObject.Person;
      }
      if (ApplyObject0) {
        customValue.ApplyObject = ApplyObject.Organization;
      }
      if (MovementType0) {
        customValue.MovementType = MovementType.Sometimes;
      }
      if (MovementType1) {
        customValue.MovementType = MovementType.Period;
      }
      return customValue;
    },
    /**
     * Add emulation table row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    addEmulation() {
      this.emitter.emit("add-table-emulation", this.customFormValue());
    },
    /**
     * Edit emulation table row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    editEmulation() {
      this.emitter.emit("edit-table-emulation", this.customFormValue());
    },
  },
};
</script>
