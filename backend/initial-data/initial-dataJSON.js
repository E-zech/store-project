import { RoleTypes } from '../models/User.js';

// initial-data
export const users = [
    {
        "firstName": "regular",
        "lastName": "user",
        "roleType": RoleTypes.user,
        "phone": "050-0000000",
        "email": "regular@gmail.com",
        "password": "Aa123456!",
    },
    {
        "firstName": "business",
        "lastName": "user",
        "roleType": RoleTypes.business,
        "phone": "050-0000000",
        "email": "business@gmail.com",
        "password": "Aa123456!",
    },
    {
        "firstName": "admin",
        "lastName": "user",
        "roleType": RoleTypes.admin,
        "phone": "050-0000000",
        "email": "admin@gmail.com",
        "password": "Abc!123Abc",
    }
];

export const products = [
    {
        "title": "Face cleanser",
        "description": "Experience the excellence of our deluxe product designed for optimal performance.",
        "howToUse": "Follow these simple steps to make the most out of your deluxe product.",
        "Ingredients": "High-quality materials and cutting-edge technology",
        "price": 39.99,
        "discount": 7.99,
        "imgUrl": "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "",
        "category": "Face",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Eye serum",
        "description": "Stay connected and efficient with our smart product designed for your convenience.",
        "howToUse": "Explore the features and functionalities to enhance your daily routine.",
        "Ingredients": "Smart sensors and eco-friendly materials",
        "price": 199.99,
        "discount": 29.99,
        "imgUrl": "https://images.pexels.com/photos/10695206/pexels-photo-10695206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "",
        "category": "Eyes",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Body cream",
        "description": "Take your experience to the next level with our ultimate product built for perfection.",
        "howToUse": "Unlock the full potential by following our comprehensive guide.",
        "Ingredients": "Premium materials and state-of-the-art components",
        "price": 139.99,
        "discount": 19.99,
        "imgUrl": "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
        "imgAlt": "",
        "category": "Body",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Hands loation",
        "description": "Take your experience to the next level with our ultimate product built for perfection.",
        "howToUse": "Unlock the full potential by following our comprehensive guide.",
        "Ingredients": "Premium materials and state-of-the-art components",
        "price": 70.99,
        "discount": 11.99,
        "imgUrl": "https://images.pexels.com/photos/5217926/pexels-photo-5217926.jpeg?auto=compress&cs=tinysrgb&w=600",
        "imgAlt": "",
        "category": "Hands",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Feet soap",
        "description": "Take your experience to the next level with our ultimate product built for perfection.",
        "howToUse": "Unlock the full potential by following our comprehensive guide.",
        "Ingredients": "Premium materials and state-of-the-art components",
        "price": 70.99,
        "discount": 11.99,
        "imgUrl": "https://images.pexels.com/photos/6621323/pexels-photo-6621323.jpeg?auto=compress&cs=tinysrgb&w=600",
        "imgAlt": "",
        "category": "Feet",
        "faves": [],
        "createdAt": Date.now()
    }
];
