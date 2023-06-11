<template>
  <emulation-header
    :selectedRows="selectedRows"
    @loading="loadingEvent"
  ></emulation-header>
  <emulation-table
    @select="totalSelectedRows"
    @select-row="selectRow"
  ></emulation-table>
  <misa-dialog
    v-model="dialogAdd"
    :title="t(title)"
    width="600px"
    top="20vh"
    :guide="true"
  >
    <emulation-form-dialog
      :type="type"
      :row="rowSelected"
    ></emulation-form-dialog>
  </misa-dialog>
  <misa-loading v-model="loading"></misa-loading>
</template>
<script>
import EmulationHeader from "./EmulationHeader.vue";
import EmulationTable from "./EmulationTable";
import EmulationFormDialog from "./EmulationFormDialog";
export default {
  name: "EmulationTitle",
  components: { EmulationHeader, EmulationTable, EmulationFormDialog },
  data() {
    return {
      dialogAdd: false,
      title: "",
      type: this.$enum.FormActions.Add,
      selectedRows: [],
      rowSelected: {},
      label: "",
      loading: false,
    };
  },
  watch: {
    /**
     * Đổi tên title theo type
     * Created At: 24/05/2023
     * @author NQTruong
     */
    type: {
      handler(value) {
        switch (value) {
          case this.$enum.FormActions.Add:
            this.title = "emulationTitle.addEmulationTitle";
            break;
          case this.$enum.FormActions.Edit:
            this.title = "emulationTitle.editEmulationTitle";
            break;
          case this.$enum.FormActions.Detail:
            this.title = "emulationTitle.editEmulationTitle";
            break;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    /**
     * Event bus toggle dialog
     * @param isShow: to show the dialog
     * Created At: 10/05/2023
     * @author NQTruong
     */
    this.emitter.on("toggle-emulation-dialog", (isShow) => {
      this.type = this.$enum.FormActions.Add;
      this.dialogAdd = isShow;
    });
  },
  methods: {
    /**
     * Hiện loading
     * Created At: 10/05/2023
     * @author NQTruong
     */
    loadingEvent(value) {
      this.loading = value;
    },
    /**
     * Pass handled value to form
     * Created At: 10/05/2023
     * @author NQTruong
     */
    selectRow(_type, row) {
      this.rowSelected = row;
      this.type = this.$enum.FormActions.Edit;
    },
    /**
     * Get all the rows that currently selected
     * @param {*} rows
     * Created At: 10/05/2023
     * @author NQTruong
     */
    totalSelectedRows(rows) {
      this.selectedRows = rows;
    },
  },
};
</script>
