<template>
  <form 
    :class="['form', { [className]: className }]" 
    @submit.prevent="() => onSubmit(submitHandler)" 
    novalidate
  >
      <slot />
  </form>
</template>

<script>
import { provide } from "vue";
import { useForm } from "@/hooks/useForm";
export default {
  props: {
    formId: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: '',
    },
    submitHandler: {
      type: Function,
      default: null
    }
  },
  setup(props) {
    const { formId } = props;
    const {
      registerField,
      onSubmit,
      hasFormErrors,
      getFieldError,
      setFieldError,
    } = useForm(formId);
    provide('registerField', registerField);
    provide('getFieldError', getFieldError);
    provide('hasFormErrors', hasFormErrors);
    provide('setFieldError', setFieldError);
    
    return { onSubmit };
  },
};
</script>

<style lang="scss">
@import './../assets/styles/style.scss';
</style>
