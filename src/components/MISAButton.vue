<template>
  <button class="button" :class="renderButton()" :disabled="disabled">
    <slot>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'MisaButton',
  data() {
    return {
    };
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    renderButton() {
      return `button__${this.type}`;
    }
  }
}
</script>

