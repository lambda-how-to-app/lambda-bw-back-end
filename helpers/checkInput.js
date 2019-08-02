const validator = require('validator');

const checkInput = inputValue => {
  const errors = {};
  Object.keys(inputValue).forEach(key => {
    if (
      !inputValue[key] ||
      validator.isEmpty(inputValue[key]) ||
      inputValue[key].trim() === '' ||
      inputValue[key] === ''
    ) {
      errors[key] = `${key} field can not be blank`;
    } else {
      /*
       *signup input Validation
       */
      if (key === 'username' || key === 'type' || key === 'title') {
        if (!validator.isLength(inputValue[key], { min: 3, max: 50 })) {
          errors[key] = `${key} must be between 3 to 50 characters`;
        }
      }
      if (key === 'steps' || key === 'review') {
        if (!validator.isLength(inputValue[key], { min: 3, max: 100 })) {
          errors[key] = `${key} must be between 3 to 100 characters`;
        }
      }

      if (key === 'fullname') {
        if (inputValue[key].search(/[^A-Za-z\s]/) !== -1) {
          errors[key] = `${key} can only be alphabetical`;
        }
      }

      if (key === 'email') {
        if (!validator.isEmail(inputValue[key])) {
          errors[key] = `Invalid ${key}`;
        }
      }
      if (key === 'password') {
        if (!validator.isLength(inputValue[key], { min: 8, max: 50 })) {
          errors[key] = `${key} must between 8 and 50 characters`;
        }
      }
    }
  });
  return errors;
};
module.exports = checkInput;
