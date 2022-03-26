import ValidationHelper from 'admin/@validation.admin';

export const loopValidations = {

  name: {
    minLength: ValidationHelper.minLength(5),
    maxLength: ValidationHelper.maxLength(100),
  },
  bpm: {
    min: ValidationHelper.min(1),
    max: ValidationHelper.max(329),
  },
  tempo: {
    maxConstant: 300,
    max: ValidationHelper.max(300),
  },
  
};
