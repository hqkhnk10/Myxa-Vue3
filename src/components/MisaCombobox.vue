<template>
  <div
    class="mcombobox"
    @click="toggleOptions"
    @keydown.down="pressArrowButton(false)"
    @keydown.up="pressArrowButton(true)"
    @keydown.enter="pressEnter"
    :class="{invalid: !valid}"
    @mouseleave="toggleOptions"
  >
    <misa-input
      type="text"
      :modelValue="labelShow"
      class="combobox-input"
      :disabled="disabled"
      @input="(e) => inputChange(e.target.value)"
    ></misa-input>
    <span class="mcombobox-input__icon" v-if="loading">
      <img
        src="/libs/mcombobox/icon/loading-icon.svg"
        class="loading"
        alt="loading"
      />
    </span>
    <misa-button
      tabindex="-1"
      type="button"
      class="mcombobox__button"
      :disabled="disabled"
    ></misa-button>
    <div
      class="mcombobox__data"
      :class="positionStyle"
      v-show="optionsBox"
    >
      <a
        v-for="(item, index) in options"
        ref="comboboxItems"
        class="mcombobox-item"
        tabindex="-1"
        :class="item.selected ? 'selected' : ''"
        :key="index"
        @click="selectOption(item)"
        >{{ item.label }}</a
      >
    </div>
  </div>
  <div class="error active" v-if="!valid">
            asdasd
  </div>
</template>

<script>
export default {
  name: "MisaCombobox",
  data() {
    return {
      optionsBox: false,
      loading: false,
    };
  },
  props: {
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String,
      default: "value",
    },
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
    disabled: {
      type: Boolean,
      default: false,
    },
    valid:{
      type: Boolean,
      default: true,
    }
  },
  computed: {
    /**
     * Search value in option array and return label to display
     */
    labelShow() {
      const objValue = this.getLabelFromValue();
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
     * Set position of the combobox option
     * CreatedBy: QTNgo (15/05/2023)
     */
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
  emits: ["update:modelValue", "change", "update:valid"],
  methods: {
    inputChange(value) {
      const objValue = this.options?.find((option) => option.value == this.value);
      if (!objValue) {
        this.$emit('update:valid', false);
      }
      console.log("value", value);
    },
    getLabelFromValue() {
      return this.options?.find((option) => option.value == this.modelValue);
    },
    /**
     * getFocusIndex
     * CreatedBy: QTNgo (15/05/2023)
     */
    getFocusIndex() {
      return this.$refs.comboboxItems.findIndex(
        (e) => e == document.activeElement
      );
    },
    /**
    getSelectedIndex() {
     * 
     * CreatedBy: QTNgo (15/05/2023)
     */
    getSelectedIndex() {
      return this.options.findIndex((row) => row.selected);
    },
    /**
     * Select item when press enter
     * CreatedBy: QTNgo (15/05/2023)
     */
    pressEnter() {
      if (this.getFocusIndex() != -1) {
        this.$emit(
          "update:modelValue",
          this.options[this.getFocusIndex()].value
        );
        this.toggleOptions();
      }
    },
    /**
     * Change the focus of combobox item
     * @param {*} arrow True: Up / False: Down
     * CreatedBy: QTNgo (15/05/2023)
     */
    pressArrowButton(arrow) {
      let focusIndex = this.getFocusIndex();
      //dont have focus
      if (focusIndex == -1) {
        let selectedIndex = this.getSelectedIndex();
        focusIndex = selectedIndex;
        //dont have selected
        if (selectedIndex == -1) {
          focusIndex = 0;
        }
      }
      if (!arrow) {
        if (focusIndex == this.options.length - 1) {
          return;
        }
        focusIndex++;
      }
      if (arrow) {
        if (focusIndex == 0) {
          return;
        }
        focusIndex--;
      }
      this.$refs.comboboxItems[focusIndex].focus();
    },
    /**
     * close the combobox
     * CreatedBy: QTNgo (15/05/2023)
     */
    closeCombobox() {
      this.optionsBox = false;
    },
    /**
     * Toggle the visibility of the options
     * CreatedBy: QTNgo (15/05/2023)
     */
    toggleOptions() {
      if (!this.disabled) {
        this.optionsBox = !this.optionsBox;
        let selectedIndex = this.getSelectedIndex();
        if (selectedIndex !== -1) {
          this.$refs.comboboxItems[selectedIndex].focus();
        } else {
          this.$refs.comboboxItems[0].focus();
        }
      }
    },
    /**
     * Update value when click item
     * CreatedBy: QTNgo (15/05/2023)
     */
    selectOption(item) {
      this.$emit("update:modelValue", item.value);
      this.$emit("change", item.value);
    },
  },
};
</script>
