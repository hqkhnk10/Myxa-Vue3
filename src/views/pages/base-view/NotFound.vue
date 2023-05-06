<template>
        <div class="error-page">
        <img src="https://cegovapp.misacdn.net/cegov/img/bg_Error404.8c4e87ee.svg" alt="404">
        <h1> OPSSS! Không tìm thấy trang. </h1>
        <p> Tính năng đang được hoàn thiện </p>
        <button class="button button__primary" @click="backToHomepage()">
            <div class="text"> Quay lại trang bài tập </div>
        </button>
    </div>
</template>
<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
<script setup>
import { router } from '@/routers/router';

const backToHomepage = () =>{
    router.push('/emulationTitle')
}
</script>