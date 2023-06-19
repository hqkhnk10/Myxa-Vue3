<template>
  <div>
    <div
      class="mcombobox"
      @click="clickComboboxButton"
      @keydown.down="pressArrowButton(false)"
      @keydown.up="pressArrowButton(true)"
      @keydown.enter="pressEnter"
      :class="{ invalid: !valid }"
      v-click-outside="closeOptions"
    >
      <misa-input
        :readonly="readonly"
        ref="input"
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
        v-show="optionsBox && filterOptions.length > 0"
      >
        <a
          v-for="(item, index) in filterOptions"
          ref="comboboxItems"
          class="mcombobox-item"
          tabindex="-1"
          :class="{ selected: item.selected, focusOn: item.focus }"
          :key="index"
          @click="selectOption(item)"
          >{{ item[label] }}</a
        >
      </div>
    </div>
    <div class="error active" v-if="!valid">
      {{ message }} {{ t("reuse.notRight") }}. {{ t("reuse.pleaseChoose") }}
      {{ message }} {{ t("reuse.inTheList") }}.
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaCombobox",
  data() {
    return {
      optionsBox: false,
      loading: false,
      inputValue: null,
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
      required: true,
    },
    position: {
      type: String,
      default: "bot",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      default: "Dữ liệu",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * Search value in option array and return label to display
     * CreatedBy: NQTruong (15/05/2023)
     */
    labelShow() {
      const objValue = this.getLabelFromValue();
      if (!objValue) {
        return "";
      }
      this.setSelected(objValue);
      return objValue[this.label];
    },
    /**
     * Lấy danh sách sau khi đã filter theo dữ liệu input
     * CreatedBy: NQTruong (15/05/2023)
     */
    filterOptions() {
      if (!this.options) {
        return [];
      }
      if (!this.inputValue) {
        return this.options;
      }
      return this.options.filter((option) =>
        option[this.label].toString().includes(this.inputValue)
      );
    },
    /**
     * Set position of the combobox option
     * CreatedBy: NQTruong (15/05/2023)
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
    /**
     * Set selected = true for the class render
     * @param {*} objValue
     * CreatedBy: NQTruong (15/05/2023)
     */
    setSelected(objValue) {
      this.options?.forEach((option) => {
        if (option == objValue) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    },
    /**
     * When click button of the combobox, open the combobox options
     * @param {*} objValue
     * CreatedBy: NQTruong (15/05/2023)
     */
    clickComboboxButton() {
      this.inputValue = null;
      this.toggleOptions();
    },
    /**
     * Thêm class focus vào options
     * @param {*} idx index cần focus
     * CreatedBy: NQTruong (15/05/2023)
     */
    addClassFocusToItem(idx) {
      this.filterOptions.forEach((option, index) => {
        if (index == idx) {
          this.filterOptions[index].focus = true;
        } else {
          this.filterOptions[index].focus = false;
        }
      });
    },
    /**
     * Mở options box nếu dữ liệu trong có dữ liệu trong options
     * CreatedBy: NQTruong (15/05/2023)
     */
    openOptions() {
      if (this.filterOptions?.length > 0) {
        this.optionsBox = true;
        this.addClassFocusToItem(
          this.getSelectedIndex() == -1 ? 0 : this.getSelectedIndex()
        );
      }
    },
    /**
     * Đóng options box
     * CreatedBy: NQTruong (15/05/2023)
     */
    closeOptions() {
      this.optionsBox = false;
    },
    /**
     * Khi dữ liệu input thay đổi, mở options box
     * Nếu có trong list option thì gửi valid = true / không có thì valid = false
     * CreatedBy: NQTruong (15/05/2023)
     */
    inputChange(value) {
      this.inputValue = value;
      this.openOptions();
      const objValue = this.options?.find(
        (option) => option[this.label] == value
      );
      if (!objValue) {
        this.$emit("update:valid", false);
      } else {
        this.$emit("update:valid", true);
      }
    },
    /**
     * Láy tiêu đề từ dữ liệu trong list options
     * CreatedBy: NQTruong (15/05/2023)
     */
    getLabelFromValue() {
      return this.options?.find(
        (option) => option[this.value] === this.modelValue
      );
    },
    /**
     * Lấy index đang focus
     * CreatedBy: NQTruong (15/05/2023)
     */
    getFocusIndex() {
      return this.filterOptions.findIndex((e) => e.focus);
    },
    /**
     * Lấy index của đang được chọn trong dánh sachs
     * CreatedBy: NQTruong (15/05/2023)
     */
    getSelectedIndex() {
      return this.filterOptions.findIndex((row) => row.selected);
    },
    /**
     * Select item when press enter
     * CreatedBy: NQTruong (15/05/2023)
     */
    pressEnter() {
      this.selectOption(this.filterOptions[this.getIndex()]);
      this.inputValue = null;
      this.toggleOptions();
    },
    /**
     * Lấy index cần focus
     * Nếu đang focus thì trả ra index focus
     * Nếu không có thì lấy dữ liệu đang được select
     * CreatedBy: NQTruong (15/05/2023)
     */
    getIndex() {
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
      return focusIndex;
    },
    /**
     * Change the focus of combobox item
     * @param {*} arrow True: Up / False: Down
     * CreatedBy: NQTruong (15/05/2023)
     */
    pressArrowButton(arrow) {
      let focusIndex = this.getIndex();
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
      this.addClassFocusToItem(focusIndex);
    },
    /**
     * close the combobox
     * CreatedBy: NQTruong (15/05/2023)
     */
    closeCombobox() {
      this.optionsBox = false;
    },
    /**
     * Toggle the visibility of the options
     * CreatedBy: NQTruong (15/05/2023)
     */
    toggleOptions() {
      if (!this.disabled) {
        if (!this.optionsBox) {
          this.openOptions();
        } else {
          this.closeOptions();
        }
      }
    },
    /**
     * Update value when click item
     * CreatedBy: NQTruong (15/05/2023)
     */
    selectOption(item) {
      this.options.forEach((option) => {
        if (option[this.value] == item[this.value]) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
      this.addClassFocusToItem(
        this.filterOptions.findIndex((e) => e[this.value] == item[this.value])
      );
      this.$nextTick(() => {
        this.$emit("update:modelValue", item[this.value]);
      });
      this.inputValue = item[this.label];
      this.$emit("change", item[this.value]);
      this.$emit("update:valid", true);
    },
  },
};
</script>
