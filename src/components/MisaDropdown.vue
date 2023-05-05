<template>
    <div class="dropdown">
        <slot name="click" @click="toogleDropdown"></slot>
            <div class="dropdown-content" v-if="showDropdown">
                <span class="custom-arrow" style="right: 58px;"></span>
                <div class="dropdown__header">
                    <div class="dropdown__header-title">{{ title }}</div>
                    <button type="button" aria-label="Close" class="dialog__headerbtn" onclick="showDropdown()"
                        style="height:15px">
                        <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width:15px" />
                    </button>
                </div>
                <div class="dropdown__body">
                    <slot name="content"></slot>
                </div>
            </div>

    </div>
</template>

<script>
export default {
    name: 'MisaDropdown',
    data() {
        return {
            showDropdown: false,
        }
    },
    methods: {
        toogleDropdown() {
            this.showDropdown = !this.showDropdown
        }
    },
}
</script>

<style></style>