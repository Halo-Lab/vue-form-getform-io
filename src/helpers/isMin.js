export const isMin = (value, key, parameter) =>
  +value && +value < parameter
    ? `It seems like your ${key} is not valid. Your ${key} must be at least ${parameter}`
    : "";
