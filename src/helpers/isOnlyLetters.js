export const isOnlyLetters = (value, key) =>
  !/^([^0-9]*)$/.test(value)
    ? `It seems like your ${key} is not valid. Please, enter ${key} with only alphabetical characters to continue`
    : "";
