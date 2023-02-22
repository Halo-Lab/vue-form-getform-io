<template>
  <form :class="['form', { [className]: className }]" @submit.prevent="submitHandler" novalidate>
    <slot></slot>
  </form>
</template>

<script>
import isValidField from "../helpers";
export default {
  props: {
    formId: {
      type: String,
      required: true,
    },
    initialValues: {
      required: true,
      type: Object,
    },
    className: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      errors: {},
      formValidators: {},
      formState: { ...this.initialValues },
    };
  },

  provide() {
    return {
      setFieldValidator: this.setFieldValidator,
      resetError: this.resetError,
      setFormState: this.setFormState,
      getFormState: this.getFormState,
      getFieldError: this.getFieldError,
      checkFieldError: this.checkFieldError,
      hasFormErrors: this.hasFormErrors,
    };
  },

  methods: {
    setFieldValidator(key, value) {
      this.formValidators[key] = value;
    },
    resetError(key) {
      this.errors[key] = "";
    },
    setFormState(key, value) {
      this.formState[key] = value;
    },
    getFormState(key) {
      return this.formState[key];
    },
    getFieldError(key) {
      return this.errors[key];
    },
    hasFormErrors() {
      return Object.values(this.errors).some((e) => !!e);
    },
    checkFieldError(key, value) {
      const validators = this.formValidators[key];
      for (let validator of validators) {
        const errorMessage = isValidField(validator, key, value);
        if (errorMessage) {
          this.errors[key] = errorMessage;
          return true;
        }
      }
      return false;
    },
    resetForm() {
      for (let key in this.formState) {
        this.formState[key] = "";
      }
      for (let key in this.errors) {
        this.errors[key] = "";
      }
    },
    async submitHandler() {
      const URL = "https://getform.io/f/";
      for (let key in this.formState) {
        if (this.checkFieldError(key, this.formState[key])) {
          return;
        }
      }
      const formData = new FormData();
      for (let key in this.formState) {
        formData.append(key, this.formState[key]);
      }
      if (this.$attrs && this.$attrs.onCustomSubmit) {
        this.$emit("customSubmit", this.formState);
        this.resetForm();
        return;
      }
      try {
        await fetch(`${URL}${this.formId}`, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.resetForm();
      }
    },
  },
};
</script>

<style lang="scss">
@import './../assets/styles/style.scss';
</style>
