<template>
  <button
    type="button"
    class="button"
    :class="renderButton()"
    :disabled="disabled"
  >
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: "MisaButton",
  data() {
    return {};
  },
  props: {
    //primary,link,secondary
    //TODO: enum
    type: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Return class of the button
     * CreatedBy: NQTruong (15/05/2023)
     */
    renderButton() {
      return `button__${this.type}`;
    },
  },
};
</script>
