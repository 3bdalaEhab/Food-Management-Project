import { VALIDATION } from '@/config/constants';

export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return false;
  }
  return VALIDATION.PASSWORD_REGEX.test(password);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000);
};

export const validateForm = (data, schema) => {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const validators = schema[field];
    validators.forEach((validator) => {
      const error = validator(data[field]);
      if (error) {
        errors[field] = error;
      }
    });
  });
  return errors;
};
