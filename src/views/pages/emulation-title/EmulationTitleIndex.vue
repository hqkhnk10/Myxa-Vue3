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
         */
        selectRow(type, row) {
            this.type = type;
            this.formValue = {
                EmulationTitleName: row.EmulationTitleName,
                EmulationTitleCode: row.EmulationTitleCode,
                ApplyObject2: row.ApplyObject == 2,
                ApplyObject0: row.ApplyObject != 2,
                CommendationLevel: row.CommendationLevel,
                MovementType0: row.MovementType == 0,
                MovementType1: row.MovementType == -1,
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