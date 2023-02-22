<template>
  <input
    :class="{ 'input': true, 'input-error': hasError, [className]: className, [errorClassName]: hasError && errorClassName }"
    @input="onInput"
    :placeholder="placeholder"
    :type="type"
    :disabled="isDisabled"
    @blur="onBlur"
    @focus="onFocuse"
    :name="name"
    :value="value"
  />
</template>

<script>
import inputMixin from "../mixins/inputMixin";
export default {
  inject: {
    setFieldValidator: "setFieldValidator",
    resetError: "resetError",
    setFormState: "setFormState",
    getFormState: "getFormState",
    getFieldError: "getFieldError",
    checkFieldError: "checkFieldError",
  },
  mixins: [inputMixin],
  computed: {
    hasError() {
      return this.getFieldError(this.name);
    },
    value() {
      return this.getFormState(this.name);
    },
  },
};
</script>

