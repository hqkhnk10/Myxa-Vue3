<template>
  <div class="dropdown">
    <slot name="click"></slot>
    <div
      class="dropdown-content"
      :class="{
        right: position == 'right' ? true : false,
        'dropdown-content-marigin': arrow,
      }"
      v-if="modelValue"
      @mouseleave="closeDropDown"
    >
      <span class="custom-arrow" v-if="arrow" :class="position"></span>
      <div class="dropdown__header" v-if="header">
        <div class="dropdown__header-title">{{ title }}</div>
        <button
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
          @click="closeDropDown"
        >
          <img src="@/assets/icon/x-icon.svg" alt="Exit" style="width: 15px" />
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
  expose: ["closeDropDown"],
  name: "MisaDropdown",
  props: {
    title: {
      type: String,
      default: "Title",
      description: "Title of the dropdown",
    },
    position: {
      type: String,
      default: "left",
      description: "Position of the dropdown",
    },
    header: {
      type: Boolean,
      default: true,
      description: "Show header or not",
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    /**
     * close  the dropdown
     * CreatedBy: QTNgo (15/05/2023)
     */
    closeDropDown() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
