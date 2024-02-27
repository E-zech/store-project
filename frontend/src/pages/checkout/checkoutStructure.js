import Joi from 'joi';

export const checkoutSturcture = [
    { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
    { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
    { name: 'email', type: 'email', label: 'Email', required: true, block: false },
    { name: 'city', type: 'text', label: 'City', required: true, block: false },
    { name: 'state', type: 'text', label: 'State', required: true, block: false },
    { name: 'country', type: 'text', label: 'Country', required: true, block: false },
    { name: 'zip', type: 'text', label: 'Zip', required: true, block: false },
];

export const schemaCheckout = Joi.object({
    firstName: Joi.string().min(2).max(20).label('First Name').required(),
    lastName: Joi.string().min(2).max(20).label('Last Name').required(),
    phone: Joi.string().pattern(/0[0-9]{2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('Phone must be 10 digits long').required(),
    email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
    city: Joi.string().min(2).max(50).label('City').required(),
    state: Joi.string().min(2).max(50).label('State').required(),
    country: Joi.string().min(2).max(50).label('Country').required(),
    zip: Joi.string().min(5).max(10).label('Zip').required(),
}).options({ abortEarly: false });
