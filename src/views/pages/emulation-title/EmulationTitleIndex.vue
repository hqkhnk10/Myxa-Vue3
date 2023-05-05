<template>
    <emulation-header />
    <emulation-table></emulation-table>
    <emulation-dialog></emulation-dialog>
</template>
<script>
import  EmulationHeader  from './EmulationHeader.vue'
import  EmulationTable  from './EmulationTable'
import  EmulationDialog  from './EmulationDialog'
export default {
    name: "EmulationTitle",
    components: {EmulationHeader, EmulationTable, EmulationDialog},
    data() {
        return {
            
        }
    },

}
</script>