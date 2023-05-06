<template>
    <div class="loading" :class="modelValue ? 'loading-show' : ''"></div>
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