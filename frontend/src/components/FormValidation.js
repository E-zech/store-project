import Joi from 'joi';

export const clientStructure = [
  { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
  { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
  { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
  { name: 'email', type: 'email', label: 'Email', required: true, block: false },
  { name: 'password', type: 'password', label: 'Password', required: true, block: false, initialOnly: true },
  { name: 'city', type: 'text', label: 'City', required: true, block: false },
  { name: 'street', type: 'text', label: 'Street', required: true, block: false },
  { name: 'houseNumber', type: 'number', label: 'House Number', required: true, block: false },
  { name: 'zip', type: 'number', label: 'zip', required: true, block: false },
];

export const schema = Joi.object({
  firstName: Joi.string().min(2).max(20).label('First Name').required(),
  lastName: Joi.string().min(2).max(20).label('Last Name').required(),
  phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(),
  email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
    .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.')
    .required(),
    city: Joi.string().min(2).max(56).label('city').required(),
    street: Joi.string().min(2).max(56).label('street').required(),
    houseNumber: Joi.number().min(1).label('houseNumber').required(),
    zip: Joi.number().min(1).label('zip').required(),
}).options({ abortEarly: false }); // To show all validation errors at once


export const ClientStructureNoPassword = [
  { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
  { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
  { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
  { name: 'email', type: 'email', label: 'Email', required: true, block: false },
  { name: 'city', type: 'text', label: 'City', required: true, block: false },
  { name: 'street', type: 'text', label: 'Street', required: true, block: false },
  { name: 'houseNumber', type: 'number', label: 'House Number', required: true, block: false },
  { name: 'zip', type: 'number', label: 'zip', required: true, block: false },
];


export const SchemaNoPassword = Joi.object({
  firstName: Joi.string().min(2).max(20).label('first name').required(),
  lastName: Joi.string().min(2).max(20).label('last name').required(),
  roleType: Joi.number().default(2),
  phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(), 
  email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
  city: Joi.string().min(2).max(56).label('city').required(),
  street: Joi.string().min(2).max(56).label('street').required(),
  houseNumber: Joi.number().min(1).label('houseNumber').required(),
  zip: Joi.number().min(1).label('zip').required(),
  
}).options({ abortEarly: false });

export const PaymentStructure = [
  { name: 'nameOnCard', type: 'text', label: 'Name On Card', required: true, block: true },
  { name: 'cardNumber', type: 'text', label: 'Card Number', required: true, block: true },
  { name: 'expiryDate', type: 'text', label: 'Expiry Date', required: true, block: true },
  { name: 'cvv', type: 'string', label: 'CVV', required: true, block: true }
];

export const SchemaPayment = Joi.object({
  nameOnCard: Joi.string().min(4).max(56).trim().required().messages({
      'string.base': `Name on card must be a string and between 3 and 56 characters long`,
      'string.empty': `Name on card is required`,
    }),
    
    cardNumber: Joi.string().trim().required().messages({
      'string.empty': `Card number is required`,
      'string.pattern.base': `Card number must be a valid credit card number in the format XXXX-XXXX-XXXX-XXXX`,
    }).regex(/^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/),


    expiryDate: Joi.string().trim().required().messages({
      'string.empty': `Expiry date is required`,
      'string.pattern.base': `Expiry date must be in MM/YY or MM/YYYY format`,
    }).regex(/^(0[1-9]|1[0-2])\/?(20[2-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3}|[0-9]{2})$/),
 
  cvv: Joi.number().integer().min(100).max(999).required().messages({ // Updated to number
      'number.base': `CVV must be a 3-digit number`, // Changed 'string.base' to 'number.base'
      'number.empty': `CVV is required`, // Changed 'string.empty' to 'number.empty'
    }),  
}).options({ abortEarly: false });






// old ones ....

// export const clientStructure1 = [
//   { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
//   { name: 'middleName', type: 'text', label: 'Middle Name', required: true, block: false },
//   { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
//   { name: 'phone', type: 'tel', label: 'Phone', required: true, block: false },
//   { name: 'email', type: 'email', label: 'Email', required: true, block: false },
//   { name: 'password', type: 'password', label: 'Password', required: true, block: false, initialOnly: true },
//   { name: 'imgUrl', type: 'text', label: 'Img Url', required: true, block: true },
//   { name: 'imgAlt', type: 'text', label: 'Img Alt', required: true, block: false },
//   { name: 'state', type: 'text', label: 'State', required: true, block: false },
//   { name: 'country', type: 'text', label: 'Country', required: true, block: false },
//   { name: 'city', type: 'text', label: 'City', required: true, block: false },
//   { name: 'street', type: 'text', label: 'Street', required: true, block: false },
//   { name: 'houseNumber', type: 'number', label: 'House Number', required: true, block: false },
//   { name: 'zip', type: 'number', label: 'Zip', required: true, block: false },
//   { name: 'business', type: 'boolean', label: 'Business', block: false }];



 
// export const schema1 = Joi.object({
//   firstName: Joi.string().required().min(2).max(20).pattern(/^[A-Za-z]+$/).message('"First Name" should only contain letters'),
//   middleName: Joi.string().min(2).max(20).pattern(/^[A-Za-z]+$/).message('"Middle Name" should only contain letters').optional(),
//   lastName: Joi.string().required().min(2).max(20).pattern(/^[A-Za-z]+$/).message('"Last Name" should only contain letters'),
//   phone: Joi.string().required().pattern(/^\d{10}$/).message('"Phone number" must be 10 digits long'),
//   email: Joi.string().email({ tlds: false }).required(),
//   password: Joi.string().required().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/)
//     .message('"Password" must contain at least one uppercase letter, one lowercase letter, one special character, and be between 8 and 32 characters in length.'),
//   imgUrl: Joi.string().required().uri({ scheme: ['http', 'https'] }).message('"Img Url" must be a valid link (HTTP or HTTPS).'),
//   imgAlt: Joi.string().required().min(2).max(20),
//   state: Joi.string().required().min(4).max(56),
//   country: Joi.string().required().min(2).max(56),
//   city: Joi.string().required(),
//   street: Joi.string().required(),
//   houseNumber: Joi.number().required(),
//   zip: Joi.number().required(),
//   business: Joi.boolean().allow()
// });



