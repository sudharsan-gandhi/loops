import { ValidationRule } from 'react-hook-form';

const ValidationHelper = {
  required: () =>
    ({
      required: {
        value: true,
        message: "This field is required",
      },
    } as { required: ValidationRule<boolean> }),
  min: (min: number) =>
    ({
      min: {
        value: min,
        message: `The minimum value allowed is ${min}`,
      },
    } as { min: ValidationRule<number | string> }),
  max: (m: number) =>
    ({
      max: {
        value: m,
        message: `The maximum value allowed is ${m}`,
      },
    } as { max: ValidationRule<number | string> }),
  maxLength: (maxLength: number) =>
    ({
      maxLength: {
        value: maxLength,
        message: `The maximum length allowed is ${maxLength}`,
      },
    } as { maxLength: ValidationRule<number> }),
  minLength: (minLength: number) =>
    ({
      minLength: {
        value: minLength,
        message: `The minimum length needed is ${minLength}`,
      },
    } as { minLength: ValidationRule<number> }),
  pattern: (regex: RegExp, message: string) =>
    ({
      pattern: {
        value: regex,
        message:
          message ||
          "Please check the format it doesnot match the required pattern",
      },
    } as { pattern: ValidationRule<RegExp> }),
  emailPattern: () => ({
    pattern: {
      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: "Not a valid email address",
    },
  }),
  passwordPattern: () => ({
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message:
        "Password must contain one upper case letter and lower case letter with atleast one special character and a number",
    },
  }),
};

export default ValidationHelper;
