<template>
  <emulation-header :selectedRows="selectedRows"></emulation-header>
  <emulation-table
    @select="totalSelectedRows"
    @select-row="selectRow"
  ></emulation-table>
  <misa-dialog
    v-model="dialogAdd"
    title="Thêm danh hiệu thi đua"
    width="600px"
    top="20vh"
  >
    <emulation-form-dialog
      :type="type"
      :formValue="formValue"
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
      type: this.$enum.FormActions.Add,
      formValue: {
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
      },
      selectedRows: [],
    };
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
  watch: {
    /**
     * reset value when press add button
     * @param {*} value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    type(value) {
      if (value == this.$enum.FormActions.Add) {
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
      }
    },
  },
  methods: {


    ...mapActions(useEmulationTitleStore, ["getDetailAPI"]),
    /**
     * Pass handled value to form
     * Created At: 10/05/2023
     * @author QTNgo
     */
    selectRow(type, row) {
      this.type = type;
      this.getDetailAPI({ id: row.emulationTitleID }).then((res) => {
        this.formValue = res.data;
      });
    },
    totalSelectedRows(rows) {
      this.selectedRows = rows;
    },
  },
};
</script>
