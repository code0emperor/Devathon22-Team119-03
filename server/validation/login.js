const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {
  let errors = {};

  //Converting empty fields to empty strings

  data.email = !isEmpty(data.email) ? data.email : "";

  data.password = !isEmpty(data.password) ? data.password : "";

  // Checking input emails
  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
  else if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";

  // Checking input password
  if (Validator.isEmpty(data.password))
    errors.password = "Password is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateInput;
