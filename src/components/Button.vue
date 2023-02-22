<template>
  <button
    :type="type"
    :class="['button',
    { [`button-${isStroke ? 'stroked' : 'filled'}`]: true,
    'button-arrow' : isArrow,
    [className]:  className
    }]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    isStroke: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "button",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isArrow: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: ''
    }
  },
  inject: {
    hasFormErrors: {
      hasFormErrors: null,
    },
  },
  computed: {
    disabled() {
      return this.hasFormErrors
        ? this.isDisabled || this.hasFormErrors()
        : this.isDisabled;
    },
  },
};
</script>
