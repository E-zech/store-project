import Joi from 'joi';

export const clientStructure = [
  { name: 'name.first', type: 'text', label: 'First Name', required: true, block: false },
  { name: 'name.middle', type: 'text', label: 'Middle Name', required: false, block: false },
  { name: 'name.last', type: 'text', label: 'Last Name', required: true, block: false },
  { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
  { name: 'email', type: 'email', label: 'Email', required: true, block: false },
  { name: 'password', type: 'password', label: 'Password', required: true, block: false, initialOnly: true },
  { name: 'address.state', type: 'text', label: 'State', required: false, block: false },
  { name: 'address.country', type: 'text', label: 'Country', required: true, block: false },
  { name: 'address.city', type: 'text', label: 'City', required: true, block: false },
  { name: 'address.street', type: 'text', label: 'Street', required: true, block: false },
  { name: 'address.houseNumber', type: 'number', label: 'House Number', required: true, block: false },
  { name: 'address.zip', type: 'number', label: 'ZIP Code', required: false, block: false },
  { name: 'image.url', type: 'text', label: 'Image URL', required: true, block: false },
  { name: 'image.alt', type: 'text', label: 'Image Alt Text', required: false, block: false },
];

export const schema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(20).label('First Name').required(),
    middle: Joi.string().allow(''),
    last: Joi.string().min(2).max(20).label('Last Name').required(),
  }).required(),

  phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('Phone must be 9 digits long').required(),

  email: Joi.string().email({ tlds: false }).lowercase().trim().required(),

  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
    .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.')
    .required(),

  address: Joi.object({
    state: Joi.string().min(2).max(56).allow(''),
    country: Joi.string().min(2).max(56).label('Country').required(),
    city: Joi.string().label('City').required(),
    street: Joi.string().label('Street').required(),
    houseNumber: Joi.number().min(1).label('House Number').required(),
    zip: Joi.number().allow(''),
  }).required(),

  image: Joi.object({
    url: Joi.string().uri().allow(''),
    alt: Joi.string().allow(''),
  }).required(),

}).options({ abortEarly: false }); // To show all validation errors at once








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



