<template>
  <label :class="['input-container']">
    <span 
      :class="{ 
        'label': true, 
        [className]: className, 
        'label-disabled': isDisabled 
      }">
        {{label}}
      </span>
    <slot/>
    <img v-if="errorMessage" 
      :src="imageUrl" 
      alt="Error icon" class="error-icon" 
      @mouseenter="tooltipShow = true"
      @mouseleave="tooltipShow = false" 
    />
    <ToolTip 
      :type="'error'" 
      :text="errorMessage" 
      :isVisible="tooltipShow" 
      :className="tooltipClassName" 
    />
  </label>
</template>

<script>
import { ref, inject, computed } from "vue";
import ToolTip from "./ToolTip.vue";
import imageUrl from "@/assets/icons/Danger.svg";
export default {
  components: { ToolTip },
  props: {
    label: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    tooltipClassName: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { name } = props;
    const tooltipShow = ref(false);
    const getFieldError = inject('getFieldError');
    const errorMessage = computed(() => getFieldError(name));

    return { tooltipShow, imageUrl, errorMessage };
  },
};
</script>

