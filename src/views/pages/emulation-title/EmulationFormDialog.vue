<template>
  {{ levelOptions }}
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
            :disabled="disabled"
            :reset="true"
            v-model="form.emulationTitleName"
            label="Tên danh hiệu thi đua"
            required
            id="first-input"
            :isValid="validate.emulationTitleName.valid"
            type="text"
            autocomplete="off"
            class="input w-full"
            placeholder="Nhập danh hiệu thi đua"
            @change="validateForm"
          ></misa-input>
          <div class="error active" v-if="!validate.emulationTitleName.valid">
            {{ validate.emulationTitleName.message }}
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
              v-model="form.emulationTitleCode"
              :disabled="disabled"
              :reset="true"
              :isValid="validate.emulationTitleCode.valid"
              label="Mã danh hiệu"
              required
              type="text"
              class="w-full"
              @change="validateForm"
            ></misa-input>
            <div class="error active" v-if="!validate.emulationTitleCode.valid">
              {{ validate.emulationTitleCode.message }}
            </div>
          </div>
        </div>
        <div class="flex-1">
          <label class="form-item__label flex"
            >{{ t("emulationTitle.applyObject") }}
            <span class="required">*</span>
          </label>
          <div class="form-item__content flex items-center">
            <misa-checkbox
              v-model="form.applyObject2"
              :disabled="disabled"
              @change="validateForm"
              class="flex-1"
              >{{ t("emulationTitle.personal") }}</misa-checkbox
            >
            <misa-checkbox
              v-model="form.applyObject0"
              :disabled="disabled"
              @change="validateForm"
              class="flex-1"
              >{{ t("emulationTitle.group") }}</misa-checkbox
            >
          </div>
          <div class="error active" v-if="!validate.applyObject.valid">
            {{ validate.applyObject.message }}
          </div>
        </div>
      </div>
      <div class="form-item form-item-flex">
        <div class="flex-1">
          <label class="form-item__label flex"
            >{{ t("emulationTitle.commendationLevel")
            }}<span class="required">*</span></label
          >
          <div class="form-item__content">
            <misa-combobox
              v-model="form.commendationLevel"
              :options="levelOptions"
            ></misa-combobox>
          </div>
        </div>
        <div class="flex-1">
          <label class="form-item__label flex"
            >{{ t("emulationTitle.movementType") }}
            <span class="required">*</span>
          </label>
          <div class="form-item__content flex items-center">
            <misa-checkbox
              v-model="form.movementType0"
              :disabled="disabled"
              @change="validateForm"
              class="flex-1"
              >{{ t("emulationTitle.regular") }}</misa-checkbox
            >
            <misa-checkbox
              v-model="form.movementType1"
              :disabled="disabled"
              @change="validateForm"
              class="flex-1"
              >{{ t("emulationTitle.period") }}</misa-checkbox
            >
          </div>
          <div class="error active" v-if="!validate.movementType.valid">
            {{ validate.movementType.message }}
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
          <div class="radio__container" @click="form.inactive = 0">
            <span>{{ t("reuse.using") }}</span>
            <input
              v-model="form.inactive"
              type="radio"
              :value="0"
              :checked="form.inactive == 0"
            />
            <span class="radio__checkmark"></span>
          </div>
          <div class="radio__container" @click="form.inactive = 1">
            <span>{{ t("reuse.shutdown") }}</span>
            <input
              v-model="form.inactive"
              type="radio"
              :value="1"
              :checked="form.inactive == 1"
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
            @click="submitAndRestForm()"
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
            t("reuse.saveChange")
          }}</misa-button>
        </div>
      </div>
    </form>
  </div>
  <misa-dialog title="Cảnh báo" v-model="validateDialog" top="30%" width="40%">
    <div class="dialog__body">
      <span>Mã danh hiệu thi đua <span style="font-weight: bold;">{{ form.emulationTitleCode }}</span> đã tồn tại trong danh sách. Xin vui lòng kiểm tra lại.</span>
    </div>
    <div class="dialog__footer">
                <misa-button type="danger" @click="validateDialog = false">
                    <span>{{ t('reuse.close') }}</span>
                </misa-button>
            </div>
  </misa-dialog>
</template>

<script>
import { dispatchNotification } from "@/components/Notification";
import { required } from "@/js/validate/validate";
import { useEmulationTitleStore } from "@/store/emulationTitle";
import { useEmulationCommendationStore } from "@/store/emulationCommendation";
import { mapActions } from "pinia";

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
      validateDialog: false,
      disabled: false,
      dialogAdd: false,
      typeForm: this.type,
      form: {...this.formValue},
      validate: {
        emulationTitleName: {
          required: true,
          message: "Tên danh hiệu không được để trống",
          valid: true,
        },
        emulationTitleCode: {
          required: true,
          message: "Mã danh hiệu không được để trống",
          valid: true,
        },
        applyObject: {
          validator: this.validateApplyObject,
          message: "Đối tượng khen thưởng không được để trống",
          valid: true,
        },
        movementType: {
          validator: this.validateMovementType,
          message: "Loại phong trào không được để trống",
          valid: true,
        },
      },
      levelOptions: [],
    };
  },

  watch: {
    /**
     * reset value when press add button
     * @param {*} value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    type(value) {
      if (value == this.$enum.FormActions.Add) {
        this.resetFormValue();
      }
      if (value == this.$enum.FormActions.Detail) {
        this.disabled = true;
      }
    },
    formValue(value){
      this.form = value;
    }
  },
  async mounted() {
    /**
     * Focus first input
     * Created At: 10/05/2023
     * @author QTNgo
     */
    this.$refs.firstInput.focus();
    await this.getEmulationCommendation().then((res)=>{
      this.levelOptions = res.data
    }).catch((err)=>{
      dispatchNotification({
            content: err?.response?.data?.userMsg ? err.response.data.message : err.message,
            type: "error",
          });
    });
  },
  methods: {
    /**
     * Register to use function in EmulationTitleStore
     * Created At: 15/05/2023
     * @author QTNgo
     */
    ...mapActions(useEmulationTitleStore, ["getAPI","addAPI", "editAPI"]),
    ...mapActions(useEmulationCommendationStore, ["getEmulationCommendation"]),
    /**
     * valudate function for Form
     * Created At: 15/05/2023
     * @author QTNgo
     */
    validateApplyObject() {
      return this.form.applyObject0 || this.form.applyObject2;
    },
    validateMovementType() {
      return this.form.movementType0 || this.form.movementType1;
    },
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
        let valid = false;
        if (this?.validate[item]?.required) {
          valid = required(this.form[item]);
        } else {
          valid = this.validate[item].validator();
        }
        this.validate[item].valid = valid;
        isValid = isValid && valid;
      });
      return isValid;
    },
    submitAndRestForm() {
      this.submitForm();
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
      }
    },
    /**
     * Handle Form value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    customFormValue() {
      let customValue = {};
      customValue.emulationTitleCode = this.form.emulationTitleCode
      customValue.emulationTitleName = this.form.emulationTitleName
      customValue.emulationTitleID = this.form.emulationTitleID
      customValue.commendationLevel = this.form.commendationLevel
      const {
        applyObject2,
        applyObject0,
        movementType0,
        movementType1,
        inactive,
      } = this.form;
      const { ApplyObject, MovementType } = this.$enum.EmulationTitle;
      if (applyObject0) {
        customValue.ApplyObject = ApplyObject.Person;
      }
      if (applyObject2) {
        customValue.ApplyObject = ApplyObject.Organization;
      }
      if (applyObject0 && applyObject2) {
        customValue.ApplyObject = ApplyObject.PersonAndOrg;
      }
      if (movementType0) {
        customValue.MovementType = MovementType.Sometimes;
      }
      if (movementType1) {
        customValue.MovementType = MovementType.Period;
      }
      if (movementType0 && movementType1) {
        customValue.MovementType = MovementType.SometimesAndPeriod;
      }
      customValue.Inactive = inactive ? 1 : 0;
      
      return customValue;
    },
    /**
     * Add emulation table row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    addEmulation() {
      var abc = this.customFormValue()
      this.addAPI(abc)
        .then(() => {
          this.getAPI();
          dispatchNotification({
            content: "Thêm thành công",
            type: "success",
          });
          this.closeDialog();
        })
        .catch((err) => {
          console.log("err", err);
          if(err.response.status == 302){
            this.validateDialog = true
          }
          else{
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        }})
    },
    /**
     * Edit emulation table row
     * Created At: 10/05/2023
     * @author QTNgo
     */
    editEmulation() {
      this.editAPI(this.customFormValue())
        .then(() => {
          this.getAPI();
          dispatchNotification({
            content: "Sửa thành công",
            type: "success",
          });
          this.closeDialog();
        })
        .catch((err) => {
          console.log("err", err);
          if(err.response.status == 302){
            this.validateDialog = true
          }
          else{
          dispatchNotification({
            content: err?.response?.data?.userMsg
              ? err.response.data.message
              : err.message,
            type: "error",
          });
        }})
    },
  },
};
</script>
