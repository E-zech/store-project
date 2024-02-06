import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AddToCartSchema } from './shared/AddToCart.js';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    roleType: {
        type: Number,
        default: 2,
    },

    phone: {
        type: String,
        required: true,
        match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
    },

    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        lowercase: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/,
    },

    addToCart: [AddToCartSchema],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        user.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        return next(err);
    }
});


const User = mongoose.model("users", userSchema);
export default User;


export const RoleTypes = {
    none: 1,
    user: 2,
    business: 3,
    admin: 4,
    master: 5,
};

// // Example user object with addToCart array
// const user = {
//     addToCart: [
//         { productId: 'eyeSerumProductId', quantity: 3 },
//         // ... other cart entries
//     ],
// };

// // Function to get the quantity for a specific product
// function getQuantityForProduct(user, productId) {
//     const cartEntry = user.addToCart.find(entry => entry.productId === productId);

//     if (cartEntry) {
//         return cartEntry.quantity;
//     } else {
//         return 0; // Product not found in the cart
//     }
// }

// // Example usage
// const productIdToCheck = 'eyeSerumProductId';
// const productName = 'eye serum';
// const quantity = getQuantityForProduct(user, productIdToCheck);

// console.log(`User has added ${quantity} of ${productName} to the cart.`);

 
// {
//         "name": {
//             "first": "Jiraya",
//             "middle": "",
//             "last": "Sama",
//         },
//         "roleType": 2,
//         "phone": "050-3764542",
//         "email": "senin@gmail.com",
//         "password": "$2b$10$cnhwC2kjeifRTUBCsfZv5.8tg3cs/qA837G2v2ZCBVHQ4O6A2LEoy",
//         "address": {
//             "state": "Land of Fire",
//             "country": "Fire Country",
//             "city": "Konoha",
//             "street": "Hokage Street",
//             "houseNumber": 2,
//             "zip": 0,
//         },
//         "image": {
//             "url": "",
//             "alt": "",
//         },
//         "_id": "65c0bdf55bdc111c2c2b864b",
//         "addToCart": [],
// }