<template>
  <input 
    :class="{
      'input': true,
      'input-error': error,
      [className]: className,
      [errorClassName]: error && errorClassName
      }" 
    :placeholder="placeholder" 
    :type="type" 
    :disabled="isDisabled" 
    :name="name" 
    v-model.trim="value"
    @blur="onBlur" 
    @focus="onFocus" 
  />
</template>

<script>
import { inject } from 'vue';
export default {
  props: {
    validator: {
      type: Array,
      default: null,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    isDisabled: {
      type: Boolean,
    },
    name: {
      type: String,
      requiered: true,
    },
    className: {
      type: String,
      default: ''
    },
    errorClassName: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const { name, defaultValue, validator } = props;
    const registerField = inject('registerField');
    const { value, error, validate, resetError } = registerField(name, defaultValue, validator);
    const onBlur = () => validate();
    const onFocus = () => resetError(name);

    return { value, error, onBlur, onFocus };
  }
};
</script>

