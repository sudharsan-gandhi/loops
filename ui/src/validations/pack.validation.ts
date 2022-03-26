import ValidationHelper from 'admin/@validation.admin';

export const packValidations = {

    name: { 
        minlength: ValidationHelper.minLength(5),
        maxLength: ValidationHelper.maxLength(50),
        
    },
    price: {
        min: ValidationHelper.min(1),
        max: ValidationHelper.max(1000)
    },
    description: {
        maxLength: ValidationHelper.maxLength(500)
    }
    
}