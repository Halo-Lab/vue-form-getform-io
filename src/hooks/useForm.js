import { reactive } from "vue";

import { useField } from "./useField";

export const useForm = (formId) => {
  const formState = reactive({});
  const formStateInitial = {};
  const errors = reactive({});
  const formValidator = {};

  const getFieldValue = (name) => formState[name];

  const setFieldValue = (name, value) => {
    formState[name] = value;
  };

  const getFieldError = (name) => errors[name];

  const setFieldError = (name, error) => {
    errors[name] = error;
  };

  const hasFormErrors = () => Object.values(errors).some((error) => !!error);

  const registerField = (name, defaultValue, validator) => {
    const {
      value,
      error,
      validate: fieldValidate,
      resetError: fieldResetError,
    } = useField(
      name,
      defaultValue,
      setFieldValue,
      getFieldValue,
      formStateInitial
    );

    const validate = () => fieldValidate(validator, setFieldError);

    const resetError = () => fieldResetError(setFieldError);

    formValidator[name] = validate;

    return {
      value,
      error,
      validate,
      resetError,
    };
  };

  const resetForm = () => {
    Object.keys(formState).forEach((key) =>
      setFieldValue(key, formStateInitial[key])
    );
    Object.keys(errors).forEach((key) => (errors[key] = undefined));
  };

  const onSubmit = async (callBack) => {
    for (const key in formValidator) {
      if (formValidator[key]()) {
        return;
      }
    }

    if (callBack) {
      return callBack({ ...formState });
    }

    const URL = "https://getform.io/f/";
    const formData = new FormData();

    for (let key in formState) {
      formData.append(key, formState[key]);
    }

    try {
      await fetch(`${URL}${formId}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
    }
  };

  return {
    registerField,
    getFieldError,
    onSubmit,
    hasFormErrors,
  };
};
