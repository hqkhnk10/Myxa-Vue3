<template>
    <div class="loading-component" :class="modelValue ? '' : 'hide'">
        <img class="loading" src="../assets/icon/loading-icon.svg" :class="modelValue ? 'loading-show' : ''" alt="loading">
    </div>
</template>

<script>
export default {
    name: "MisaLoading",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    }
}
</script>