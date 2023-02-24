import { ref, computed } from "vue";

import isValidField from "@/helpers";

const setError = (error, name, massage, callBack) => {
  error.value = true;
  callBack(name, massage);
};

export const useField = (name, setFieldValue, getFieldValue) => {
  const value = computed({
    get: () => getFieldValue(name),
    set: (newValue) => {
      setFieldValue(name, newValue);
    },
  });
  const error = ref(false);

  const validate = (validators, callBack) => {
    if (validators) {
      for (const validator of validators) {
          const { name: key, message, value: parameter } = validator;
        const errorMassage = isValidField(key, name, value.value, parameter);
        if (errorMassage) {
          setError(error, name, (message || errorMassage), callBack);
          return;
        }
      }
    }
  };

  const resetError = (callBack) => {
    error.value = false;
    callBack(name, "");
  };

  return {
    value,
    error,
    validate,
    resetError,
  };
};
