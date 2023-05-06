<template>
    <div class="loading-screen">
        <div class="loading-show"></div>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    name: 'LoadingScreen',
    setup() {
        const loading = ref(false)
        return {
            loading
        }
    }
}
</script>
  
<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
</style>