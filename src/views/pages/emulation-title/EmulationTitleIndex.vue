<template>
  <emulation-header :selectedRows="selectedRows"></emulation-header>
  <emulation-table
    @select="totalSelectedRows"
    @select-row="selectRow"
  ></emulation-table>
  <misa-dialog v-model="dialogAdd" :title="t(title)" width="600px" top="20vh">
    <emulation-form-dialog
      :type="type"
      :formValue="form"
    ></emulation-form-dialog>
  </misa-dialog>
</template>
<script>
import EmulationHeader from "./EmulationHeader.vue";
import EmulationTable from "./EmulationTable";
import EmulationFormDialog from "./EmulationFormDialog";
import { useEmulationTitleStore } from "@/store/emulationTitle";
import { mapActions } from "pinia";
export default {
  name: "EmulationTitle",
  components: { EmulationHeader, EmulationTable, EmulationFormDialog },
  data() {
    return {
      dialogAdd: false,
      title: "emulationTitle.addEmulationTitle",
      type: this.$enum.FormActions.Add,
      formValue: {
        emulationTitleName: "",
        emulationTitleCode: "MF1616",
        applyObject: 3,
        commendationLevel: 3,
        movementType: 2,
        inactive: 0,
      },
      selectedRows: [],
    };
  },
  watch: {
    type(value) {
      switch (value) {
        case this.$enum.FormActions.Add:
          return "emulationTitle.addEmulationTitle";
        case this.$enum.FormActions.Edit:
          return "emulationTitle.editEmulationTitle";
        case this.$enum.FormActions.Detail:
          return "emulationTitle.editEmulationTitle";
      }
    },
  },
  computed: {
    form() {
      let form = {};
      form.emulationTitleName = this.formValue.emulationTitleName;
      form.emulationTitleCode = this.formValue.emulationTitleCode;
      form.commendationLevel = this.formValue.commendationLevel;
      form.inactive = this.formValue.inactive;
      switch (this.formValue.applyObject) {
        case this.$enum.EmulationTitle.ApplyObject.Person:
          form.applyObject0 = true;
          form.applyObject2 = false;
          break;
        case this.$enum.EmulationTitle.ApplyObject.Organization:
          form.applyObject0 = false;
          form.applyObject2 = true;
          break;
        case this.$enum.EmulationTitle.ApplyObject.PersonAndOrg:
          form.applyObject0 = true;
          form.applyObject2 = true;
          break;
        default:
          form.applyObject0 = false;
          form.applyObject2 = false;
          break;
      }
      switch (this.formValue.movementType) {
        case this.$enum.EmulationTitle.MovementType.Sometimes:
          form.movementType0 = true;
          form.movementType1 = false;
          break;
        case this.$enum.EmulationTitle.MovementType.Period:
          form.movementType0 = false;
          form.movementType1 = true;
          break;
        case this.$enum.EmulationTitle.MovementType.SometimesAndPeriod:
          form.movementType0 = true;
          form.movementType1 = true;
          break;
        default:
          form.movementType0 = false;
          form.movementType1 = false;
          break;
      }
      return form;
    },
  },
  mounted() {
    /**
     * Event bus toggle dialog
     * @param isShow: to show the dialog
     * Created At: 10/05/2023
     * @author QTNgo
     */
    this.emitter.on("toggle-emulation-dialog", (isShow) => {
      this.type = this.$enum.FormActions.Add;
      this.dialogAdd = isShow;
    });
  },
  methods: {
    resetFormValue() {
      this.formValue = {
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
    ...mapActions(useEmulationTitleStore, ["getDetailAPI"]),
    /**
     * Pass handled value to form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    selectRow(_type, row) {
      this.getDetailAPI({ id: row.emulationTitleID }).then((res) => {
        this.formValue = {...res.data};
      });
      if (this.formValue?.inactive == 1) {
        this.type = this.$enum.FormActions.Detail;
      } else {
        this.type = this.$enum.FormActions.Edit;
      }
    },
    totalSelectedRows(rows) {
      this.selectedRows = rows;
    },
  },
};
</script>
