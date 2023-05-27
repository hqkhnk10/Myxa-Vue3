<template>
  <div class="dialog__body">
    <form class="form" id="form-add-title" ref="misaForm">
      <div class="form-item">
        <label class="form-item__label"
          >{{ t("emulationTitle.emulationTitleName")
          }}<span class="required" v-if="validate.emulationTitleName.required"
            >*</span
          ></label
        >
        <div class="form-item__content">
          <misa-input
            ref="firstInput"
            :disabled="disabled"
            :reset="true"
            v-model="form.emulationTitleName"
            :isValid="validate.emulationTitleName.valid"
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
            }}<span class="required" v-if="validate.emulationTitleCode.required"
              >*</span
            ></label
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
              :disabled="disabled"
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
            v-model="form.emulationTitleNote"
            class="textarea-resize"
            placeholder="Nhập ghi chú"
            :disabled="disabled"
          ></textarea>
        </div>
      </div>
      <div class="form-item" v-if="showStatus()">
        <label class="form-item__label">Trạng thái</label>
        <div class="form-item__content flex gap-12px">
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
        <misa-button type="secondary" @click="closeDialog()">
          <span>{{ t("reuse.cancel") }}</span>
        </misa-button>
        <div class="flex gap-12px" v-if="type == this.$enum.FormActions.Add">
          <misa-button type="primary-border" @click="submitAndResetForm()">
            <span>{{ t("reuse.saveAndAdd") }}</span>
          </misa-button>
          <misa-button type="primary" @click="submitForm()">
            <span>{{ t("reuse.save") }}</span>
          </misa-button>
        </div>
        <div v-if="showStatus()">
          <misa-button type="primary" @click="submitForm()">{{
            t("reuse.saveChange")
          }}</misa-button>
        </div>
      </div>
    </form>
  </div>
  <misa-dialog title="Cảnh báo" v-model="validateDialog" width="40%">
    <div class="dialog__body">
      <span
        >Mã danh hiệu thi đua
        <span style="font-weight: bold">{{ form.emulationTitleCode }}</span> đã
        tồn tại trong danh sách. Xin vui lòng kiểm tra lại.</span
      >
    </div>
    <div class="dialog__footer">
      <misa-button type="danger" @click="validateDialog = false">
        <span>{{ t("reuse.close") }}</span>
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

export default {
  name: "EmulationFormDialog",
  props: {
    row: {
      type: Object,
      description:
        "Dữ liệu của được chọn, được truyền từ EmulationTItleIndex.vue",
    },
    type: {
      type: String,
      default: "Add",
      description: "Kiểu type, được truyền từ EmulationTItleIndex.vue",
    },
  },

  data() {
    return {
      successContent: "",
      validateDialog: false,
      dialogAdd: false,
      typeForm: this.type,
      form: {},
      apiFunc: null,
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
  computed: {
    /**
     * Nếu type là detail thì trả ra true để disable form
     * Created At: 24/05/2023
     * @author QTNgo
     */
    disabled() {
      return this.type == this.$enum.FormActions.Detail ? true : false;
    },
    /**
     * Tự động sinh code khi thay đổi tên
     * Created At: 24/05/2023
     * @author QTNgo
     */
    inputCode() {
      let code = this.getFirstLetters(this.form?.emulationTitleName);
      return code;
    },
  },
  mounted() {
    /**
     * Focus first input
     * Created At: 10/05/2023
     * @author QTNgo
     */
    this.$refs.firstInput.focus();

    /**
     * Lấy cấp phong trào
     * Created At: 24/05/2023
     * @author QTNgo
     */
    this.getEmulationCommendation()
      .then((res) => {
        this.levelOptions = res.data;
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
  watch: {
    /**
     * Thay đổi mã theo tên
     * Created At: 24/05/2023
     * @author QTNgo
     */
    inputCode(newValue, oldValue) {
      if (
        oldValue == this.form["emulationTitleCode"] ||
        this.form["emulationTitleCode"] == "" ||
        this.form["emulationTitleCode"] == "MF1616" ||
        newValue == ""
      ) {
        this.form["emulationTitleCode"] = newValue;
      }
    },
    /**
     * Xử lí khi thay đổi type
     * Created At: 24/05/2023
     * @author QTNgo
     */
    type: {
      handler(value) {
        switch (value) {
          case this.$enum.FormActions.Add:
            this.apiFunc = this.addAPI;
            this.successContent = this.t("reuse.addSuccess");
            this.resetFormValue();
            break;
          case this.$enum.FormActions.Edit:
          case this.$enum.FormActions.Detail:
            this.apiFunc = this.editAPI;
            this.successContent = this.t("reuse.editSuccess");
            this.getFormValue();
            break;
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Lấy chữ cái đầu của các từ trong một chuỗi
     * @param {*} str chuỗi
     * Created At: 24/05/2023
     * @author QTNgo
     */
    getFirstLetters(str) {
      if (!str) {
        return "";
      }
      const words = str.split(" ");
      const firstLetters = words.map((word) => word.charAt(0).toUpperCase());
      return firstLetters.join("");
    },
    /**
     * Hiện ô trạng thái
     * Created At: 24/05/2023
     * @author QTNgo
     */
    showStatus() {
      if (
        this.type == this.$enum.FormActions.Edit ||
        this.type == this.$enum.FormActions.Detail
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Xử lí dữ liệu từ API
     * @param {*} formValue dữ liệu từ APi
     * Created At: 24/05/2023
     * @author QTNgo*/
    customGetValue(formValue) {
      this.form.emulationTitleName = formValue?.emulationTitleName;
      this.form.emulationTitleCode = formValue?.emulationTitleCode;
      this.form.emulationTitleNote = formValue?.emulationTitleNote;
      this.form.commendationLevel = formValue?.commendationLevel;
      this.form.emulationTitleID = formValue?.emulationTitleID;
      this.form.inactive = formValue?.inactive;
      switch (formValue?.applyObject) {
        case this.$enum.EmulationTitle.ApplyObject.Person:
          this.form.applyObject0 = true;
          this.form.applyObject2 = false;
          break;
        case this.$enum.EmulationTitle.ApplyObject.Organization:
          this.form.applyObject0 = false;
          this.form.applyObject2 = true;
          break;
        case this.$enum.EmulationTitle.ApplyObject.PersonAndOrg:
          this.form.applyObject0 = true;
          this.form.applyObject2 = true;
          break;
        default:
          this.form.applyObject0 = false;
          this.form.applyObject2 = false;
          break;
      }
      switch (formValue?.movementType) {
        case this.$enum.EmulationTitle.MovementType.Sometimes:
          this.form.movementType0 = true;
          this.form.movementType1 = false;
          break;
        case this.$enum.EmulationTitle.MovementType.Period:
          this.form.movementType0 = false;
          this.form.movementType1 = true;
          break;
        case this.$enum.EmulationTitle.MovementType.SometimesAndPeriod:
          this.form.movementType0 = true;
          this.form.movementType1 = true;
          break;
        default:
          this.form.movementType0 = false;
          this.form.movementType1 = false;
          break;
      }
    },
    /**
     * Gọi API lấy chi tiết
     * Created At: 24/05/2023
     * @author QTNgo
     */
    getFormValue() {
      this.getDetailAPI(this.row.emulationTitleID)
        .then((res) => {
          this.customGetValue(res?.data);
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
     * Reset value of the form
     * Created At: 15/05/2023
     * @author QTNgo
     */
    resetFormValue() {
      this.form = {
        emulationTitleName: "",
        emulationTitleCode: "MF1616",
        applyObject2: true,
        applyObject0: false,
        commendationLevel: 3,
        movementType0: true,
        movementType1: false,
        inactive: 0,
        emulationTitleID: 50,
        isSystem: 1,
      };
    },
    /**
     * Register to use function in EmulationTitleStore
     * Created At: 15/05/2023
     * @author QTNgo
     */
    ...mapActions(useEmulationTitleStore, [
      "getAPI",
      "addAPI",
      "editAPI",
      "getDetailAPI",
    ]),
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
    async submitAndResetForm() {
      if (this.validateForm()) {
        const res = await this.submitAPI(false);
        if (res) {
          alert("reset");
          this.resetFormValue();
        }
      }
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
        this.submitAPI();
      }
    },
    /**
     * Handle Form value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    customPostValue() {
      let customValue = {};
      customValue.emulationTitleCode = this.form.emulationTitleCode;
      customValue.emulationTitleName = this.form.emulationTitleName;
      customValue.emulationTitleNote = this.form.emulationTitleNote;
      customValue.emulationTitleID = this.form.emulationTitleID;
      customValue.commendationLevel = this.form.commendationLevel;
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
     * Thêm hoặc sửa tùy thuộc theo Type
     * Created At: 10/05/2023
     * @author QTNgo
     */
    async submitAPI(closeDialog = true) {
      let postValue = this.customPostValue();
      return this.apiFunc(postValue)
        .then(() => {
          this.getAPI();
          dispatchNotification({
            content: this.successContent,
            type: "success",
          });
          if (closeDialog) {
            this.closeDialog();
          }
          return true;
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response.status == 302) {
            this.validateDialog = true;
          } else {
            dispatchNotification({
              content: err?.response?.data?.userMsg
                ? err.response.data.message
                : err.message,
              type: "error",
            });
          }
          return false;
        });
    },
  },
};
</script>
