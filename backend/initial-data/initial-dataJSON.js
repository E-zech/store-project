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
        "title": "Deluxe Product 1",
        "description": "Experience the excellence of our deluxe product designed for optimal performance.",
        "howToUse": "Follow these simple steps to make the most out of your deluxe product.",
        "Ingredients": "High-quality materials and cutting-edge technology",
        "price": 149.99,
        "discount": 10,
        "imgUrl": "",
        "imgAlt": "",
        "category": ["Electronics", "Gadgets"],
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Smart Product 2",
        "description": "Stay connected and efficient with our smart product designed for your convenience.",
        "howToUse": "Explore the features and functionalities to enhance your daily routine.",
        "Ingredients": "Smart sensors and eco-friendly materials",
        "price": 199.99,
        "discount": 5,
        "imgUrl": "",
        "imgAlt": "",
        "category": ["Smart Home", "Technology"],
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Ultimate Product 3",
        "description": "Take your experience to the next level with our ultimate product built for perfection.",
        "howToUse": "Unlock the full potential by following our comprehensive guide.",
        "Ingredients": "Premium materials and state-of-the-art components",
        "price": 299.99,
        "discount": 15,
        "imgUrl": "",
        "imgAlt": "",
        "category": ["Luxury", "Tech Enthusiasts"],
        "faves": [],
        "createdAt": Date.now()
    }
];
