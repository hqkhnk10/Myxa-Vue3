<template>
  <div class="dropdown" @keydown.esc="closeDropDown">
    <slot name="click"></slot>
    <div
      class="dropdown-content"
      :class="{
        right: position == 'right' ? true : false,
        'dropdown-content-marigin': arrow,
      }"
      v-if="modelValue"
      @mouseleave="mouseleaveEvent"
    >
      <span class="custom-arrow" v-if="arrow" :class="position"></span>
      <div class="dropdown__header" v-if="header">
        <div class="dropdown__header-title">{{ title }}</div>
        <button
          tabindex="-1"
          type="button"
          aria-label="Close"
          class="dialog__headerbtn"
          @click="closeDropDown"
        >
          <div class="tooltip">
            <div class="icon__x"></div>
            <span class="tooltiptext tooltiptext-top">{{
              t("reuse.close")
            }}</span>
          </div>
        </button>
      </div>
      <div class="dropdown__body"  v-click-outside="closeDropDown">
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
    mouseleave:{
      type: Boolean,
      default: false,
    }
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
    mouseleaveEvent(){
      console.log('leave');
      if(!this.mouseleave){
        return
      }
      this.closeDropDown();
    },
  },
};
</script>
