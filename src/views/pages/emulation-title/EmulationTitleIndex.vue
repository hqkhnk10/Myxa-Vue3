<template>
    <emulation-header :selectedRows="selectedRows"></emulation-header>
    <emulation-table @select="totalSelectedRows" @select-row="selectRow"></emulation-table>
    <misa-dialog v-model="dialogAdd" title="Thêm danh hiệu thi đua" width="600px" top="20vh">
        <emulation-form-dialog :type="type" :formValue="formValue"></emulation-form-dialog>
    </misa-dialog>
</template>
<script>
import  EmulationHeader  from './EmulationHeader.vue'
import  EmulationTable  from './EmulationTable'
import  EmulationFormDialog  from './EmulationFormDialog'
export default {
    name: "EmulationTitle",
    components: {EmulationHeader, EmulationTable, EmulationFormDialog},
    data() {
        return {
            dialogAdd: false,
            type: this.$enum.FormActions.Add,
            formValue: {
                EmulationTitleName: "",
                EmulationTitleCode: "MF1616",
                ApplyObject2: false,
                ApplyObject0: false,
                CommendationLevel: 3,
                MovementType0: false,
                MovementType1: false,
                Inactive: 0,
                EmulationTitleID: 50,
                IsSystem: 1
            },
            selectedRows:[]
        }
    },
    mounted() {
        /**
         * Event bus toggle dialog
         * @param isShow: to show the dialog
         * Created At: 10/05/2023
         * @author QTNgo
         */
        this.emitter.on("toggle-emulation-dialog", (isShow) => {
            this.type = this.$enum.FormActions.Add
            this.dialogAdd = isShow;
        });
    },
    watch:{
        /**
         * reset value when press add button
         * @param {*} value 
         * Created At: 10/05/2023
         * @author QTNgo
         */
        type(value){
            if(value == this.$enum.FormActions.Add){
                this.formValue= {
                EmulationTitleName: "",
                EmulationTitleCode: "MF1616",
                ApplyObject2: false,
                ApplyObject0: false,
                CommendationLevel: 3,
                MovementType0: false,
                MovementType1: false,
                Inactive: 0,
                EmulationTitleID: 50,
                IsSystem: 1
            }
            }
        }
    },
    methods: {
        /**
         * Pass handled value to form
         * Created At: 10/05/2023
         * @author QTNgo
         */
        selectRow(type, row) {
            this.type = type;
            this.formValue = {
                EmulationTitleName: row.EmulationTitleName,
                EmulationTitleCode: row.EmulationTitleCode,
                ApplyObject2: row.ApplyObject == this.$enum.EmulationTitle.ApplyObject.Person,
                ApplyObject0: row.ApplyObject == this.$enum.EmulationTitle.ApplyObject.Organization,
                CommendationLevel: row.CommendationLevel,
                MovementType0: row.MovementType == this.$enum.EmulationTitle.Sometimes,
                MovementType1: row.MovementType == this.$enum.EmulationTitle.Period,
                Inactive: row.Inactive,
                EmulationTitleID: row.EmulationTitleID,
                IsSystem: row.IsSystem
            }
        },
        totalSelectedRows(rows){
            this.selectedRows = rows;
        }
    },
}
</script>