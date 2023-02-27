<template>
  <textarea 
    :class="{ 
      'input input-textarea': true, 
      'input-error': error, 
      [className]: className, 
      [errorClassName]: error && errorClassName 
      }" 
    v-model.trim="value"
    @input="(e) => $emit('update:value', e.target.value)" 
    :placeholder="placeholder" 
    :disabled="isDisabled"
    @blur="onBlur" 
    @focus="onFocus" 
    :name="name" 
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
