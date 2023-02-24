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
    :name="name" v-model.trim="value"
    @input="(e) => $emit('update:value', e.target.value)" 
    @blur="onBlur" 
    @focus="onFocus" />
</template>

<script>
import { inject } from 'vue';
export default {
  props: {
    validator: {
      type: String,
      default: "",
      validator: (value) =>
        value
          .split("|")
          .every((val) => ["required", "onlyLetters", "email"].includes(val)),
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
    }
  },
  setup(props) {
    const { name, validator } = props;
    const registerField = inject('registerField');
    const { value, error, validate, resetError } = registerField(name, validator);
    const onBlur = () => validate();
    const onFocus = () => resetError(name);

    return {
      value, error, onBlur, onFocus
    }
  }
};
</script>

