<template>
  <div class="mcombobox" @click="toggleOptions">
    <misa-input type="text" :modelValue="label" class="combobox-input" :disabled="disabled"></misa-input>
    <span class="mcombobox-input__icon" v-if="loading">
      <img
        src="/libs/mcombobox/icon/loading-icon.svg"
        class="loading"
        alt="loading"
      />
    </span>
    <misa-button type="button" class="mcombobox__button" :disabled="disabled"></misa-button>
    <div class="mcombobox__data" :class="positionStyle" v-if="optionsBox">
      <a
        v-for="(item, index) in options"
        class="mcombobox-item"
        :class="item.selected ? 'selected' : ''"
        :key="index"
        @click="selectOption(item)"
        >{{ item.label }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaCombobox",
  data() {
    return {
      optionsBox: false,
      loading: false
    };
  },
  props: {
    modelValue: {
      type: [String, Number, null, undefined],
    },
    options: {
      type: Object,
    },
    position: {
      type: String,
      default: "bot",
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    /**
     * Search value in option array and return label to display
     */
    label() {
      const objValue = this.options?.find(
        (option) => option.value == this.modelValue
      );
      if (objValue) {
        this.options.forEach((option) => {
          if (option == objValue) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
        return objValue?.label;
      } else {
        return "";
      }
    },
    /**
     * Set style of the combobox
     */
    widthDialog() {
      return `width: ${this.width}`;
    },
    paddingTop() {
      return `padding-top: ${this.top}`;
    },
    positionStyle() {
      if (this.position == "top") {
        return "bot100";
      }
      if (this.position == "bot") {
        return "top100";
      }
      return "";
    },
  },
  emits: ["update:modelValue", "change"],
  methods: {
    toggleDialog() {
      this.$emit("update:modelValue", !this.modelValue);
    },
    toggleOptions() {
      if(!this.disabled){
        this.optionsBox = !this.optionsBox;
      }
    },
    selectOption(item) {
      this.$emit("update:modelValue", item.value);
      this.$emit("change", item.value);
    },
  },
};
</script>

