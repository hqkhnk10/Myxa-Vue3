<template>
    <div class="dropdown">
        <div @click="toggleDropdown">
            <slot name="click"></slot>
        </div>
        <div class="dropdown-content" :class="position" v-if="showDropdown"  @mouseleave="showDropdown = false">
            <span class="custom-arrow" :class="position"></span>
            <div class="dropdown__header" v-if="header">
                <div class="dropdown__header-title">{{ title }}</div>
                <button type="button" aria-label="Close" class="dialog__headerbtn" @click="toggleDropdown">
                    <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width: 15px;" />
                </button>
            </div>
            <div class="dropdown__body">
                <slot name="content"></slot>
            </div>
            <div class="dropdown__footer">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    expose: ['toggleDropdown'],
    name: 'MisaDropdown',
    props: {
        title: {
            type: String,
            default: 'Title',
            description: 'Title of the dropdown'
        },
        position: {
            type: String,
            default: 'left',
            description: 'Position of the dropdown'
        },
        header: {
            type: Boolean,
            default: true,
            description: 'Show header or not'
        }
    },
    data() {
        return {
            showDropdown: false,
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        }
    },
}
</script>