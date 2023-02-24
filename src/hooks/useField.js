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

  const validate = async (validators, callBack) => {
    if (validators) {
      for (let validator of validators) {
        const errorMassage = isValidField(validator, name, value.value);
        if (errorMassage) {
          setError(error, name, errorMassage, callBack);
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
