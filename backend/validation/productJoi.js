import Joi from 'joi';

export const ProductValid = Joi.object({
    title: Joi.string().min(2).max(30).required(),

    description: Joi.string().min(10).max(900).required(),

    howToUse: Joi.string().min(10).max(900).required(),

    Ingredients: Joi.string().min(10).max(900).required(),

    price: Joi.number().required(),

    discount: Joi.number(),

    imgUrl: Joi.string().uri().allow(""),

    imgAlt: Joi.string().allow(""),

    category: Joi.string().valid('Face', 'Eyes', 'Body', 'Hands', 'Feet').required(),

    productId: Joi.string().hex().length(24),

    faves: Joi.array().default([]),

    createdAt: Joi.date(),
});

export const productNumberIsValid = Joi.object({
    productId: Joi.string() // Expecting a string (Types.ObjectId is a string)
        .length(24) // ObjectId is a 24-character hexadecimal string
        .hex() // Ensure it's a valid hexadecimal string
        .messages({
            'string.base': 'productId must be a string',
            'string.length': 'productId must be a 24-character hexadecimal string',
            'string.hex': 'productId must be a valid hexadecimal string',
        }),
});
