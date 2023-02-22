import { isEmpty } from "./isEmpty";
import { isValidEmail } from "./isValidEmail";
import { isOnlyLetters } from "./isOnlyLetters";

export const isValidField = (validatorKey, key, value) => {
  switch (validatorKey) {
    case "required":
      return isEmpty(value, key);
    case "email":
      return isValidEmail(value, key);
    case "onlyLetters":
      return isOnlyLetters(value, key);
    default:
      return "";
  }
};
