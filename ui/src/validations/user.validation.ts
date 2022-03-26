import ValidationHelper from 'admin/@validation.admin';

export const userValidations = {
    
  name: {
    minLength: ValidationHelper.minLength(5),
    maxLength: ValidationHelper.maxLength(50),
  },
  about: {
    maxLength: ValidationHelper.maxLength(500),
  },
  password: {
    pattern: ValidationHelper.passwordPattern(),
  },
  email: {
    minLength: ValidationHelper.minLength(8),
    maxLength: ValidationHelper.maxLength(75),
    pattern: ValidationHelper.emailPattern(),
  },
  
};
