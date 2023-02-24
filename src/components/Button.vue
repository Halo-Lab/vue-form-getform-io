<template>
  <button 
    :type="type" 
    :class="['button',
      {
        [`button-${isStroke ? 'stroked' : 'filled'}`]: true,
        'button-arrow': isArrow,
        [className]: className
      }]" 
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
import { inject, computed } from 'vue';
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
  setup(props) {
    const { isDisabled } = props;
    const hasFormErrors = inject('hasFormErrors');
    const disabled = computed(() => (hasFormErrors() || isDisabled) || isDisabled);

    return {
      disabled
    }
  }
}
</script>
