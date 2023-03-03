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
      validate: fieldValidate,
      resetError: fieldResetError,
      fileValidate,
    } = useField(
      name,
      defaultValue,
      setFieldValue,
      getFieldValue,
      formStateInitial
    );

    const validate = () => fieldValidate(validator, setFieldError);

    const resetError = () => fieldResetError(setFieldError);

    const fileFieldValidate = (file, validTypes) => fileValidate(file, validTypes, setFieldError)

    formValidator[name] = name.includes('[]') ? fileFieldValidate : validate;

    return {
      value,
      validate,
      resetError,
      fileFieldValidate
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

    if (!formId) {
      throw new Error(
        'You did not provaded "formId" or submit callback function. Please, provovide either'
      );
    }

    const URL = "https://getform.io/f/";
    const formData = new FormData();

    for (let key in formState) {
      if (key.includes("[]")) {
        formState[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, formState[key]);
      }
    }

    try {
      await fetch(`${URL}${formId}`, {
        method: "POST",
        body: formData,
        ContentType: 'multipart/form-data', 
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
    setFieldError,
  };
};
