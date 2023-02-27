import { ref, computed, onBeforeMount } from "vue";

import isValidField from "@/helpers";

const setError = (error, name, massage, callBack) => {
  error.value = true;
  callBack(name, massage);
};

export const useField = (name, defaultValue, setFieldValue, getFieldValue) => {
//   onBeforeMount(() => {
//     if (defaultValue !== undefined) {
//       setFieldValue(name, defaultValue);
//     }
//   });

  const value = computed({
    get: () => getFieldValue(name) ?? defaultValue,
    set: (newValue) => {
      setFieldValue(name, newValue);
    },
  });
  const error = ref(false);

  const validate = (validators, callBack) => {
    if (validators) {
      for (const validator of validators) {
        const { name: key, message, value: parameter } = validator;
        let errorMassage = isValidField(key, name, value.value, parameter);
        if (errorMassage) {
          if (key === "func") {
            errorMassage = message;
          }
          setError(error, name, message || errorMassage, callBack);
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
