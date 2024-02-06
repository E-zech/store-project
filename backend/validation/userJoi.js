import Joi from 'joi';

export const UserValid = Joi.object({

    firstName: Joi.string().min(2).max(20).label('first name').required(),

    lastNameast: Joi.string().min(2).max(20).label('last name').required(),

    roleType: Joi.number().default(2),

    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('phone must be 9 digits long').required(),

    email: Joi.string().email().lowercase().trim().required(),

    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).message('password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.').required(),

    addToCart: Joi.array().items(
        Joi.object({
            productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().required(),
            addedAt: Date.now(),
            status: Joi.string().default('pending'),
        })
    ),
});

export const userLoginValidation = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/).required(),
});





