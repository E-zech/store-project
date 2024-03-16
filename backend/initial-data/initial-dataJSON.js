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
        "city": "New-York",
        "street": "Marvin",
        "houseNumber": "5",
        "zip": "5050"
    },
    {
        "firstName": "business",
        "lastName": "user",
        "roleType": RoleTypes.business,
        "phone": "050-0000000",
        "email": "business@gmail.com",
        "password": "Aa123456!",
        "city": "New-Jersey",
        "street": "Marvin",
        "houseNumber": "5",
        "zip": "5050"
    },
    {
        "firstName": "admin",
        "lastName": "user",
        "roleType": RoleTypes.admin,
        "phone": "050-0000000",
        "email": "admin@gmail.com",
        "password": "Abc!123Abc",
        "city": "Florida",
        "street": "Marvin",
        "houseNumber": "5",
        "zip": "5050"
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
        "imgAlt": "a photo of Face cleanser",
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
        "imgAlt": "a photo of Eye serum",
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
        "imgAlt": "a photo of Body cream",
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
        "imgAlt": "a photo of Hands loation",
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
        "imgAlt": "a photo of Feet soap",
        "category": "Feet",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Acne Spray (Body)",
        "description": "Acne Spray Treatment contains salicylic acid as the main ingredient for the treatment of acne primarily on the chest and back. It helps keep skin clear from new acne blemishes and this convenient, easy-to-use upside down pump for uniform spraying dries very quickly.",
        "howToUse": "Cleanse the skin thoroughly before applying the product Hold the bottle upside-down and spray a thin layer over the affected area, ensuring even coverage Because of its quick-drying formula, there's no need to rub it in. Simply allow it to dry completely. Apply 1 to 3 times daily, depending on the severity of your acne. If excessive dryness or peeling occurs, reduce application to once a day or every other day. For best results, use consistently and as part of your daily skincare routine.",
        "Ingredients": "Salicylic Acid, Alcohol Denat, Witch Hazel, Aloe Vera, Glycerin, Allantoin",
        "price": 70.99,
        "discount": 11.99,
        "imgUrl": "https://target.scene7.com/is/image/Target/GUEST_2c24d2d8-18b7-4ff6-ad9d-ec1889fb4bcb?wid=488&hei=488&fmt=pjpeg",
        "imgAlt": "a photo of Acne Spray Treatment",
        "category": "Body",
        "faves": [],
        "createdAt": Date.now()
    },
    {
        "title": "Acne Spray (face)",
        "description": "Acne Spray Treatment contains salicylic acid as the main ingredient for the treatment of acne primarily on the chest and back. It helps keep skin clear from new acne blemishes and this convenient, easy-to-use upside down pump for uniform spraying dries very quickly.",
        "howToUse": "Cleanse the skin thoroughly before applying the product Hold the bottle upside-down and spray a thin layer over the affected area, ensuring even coverage Because of its quick-drying formula, there's no need to rub it in. Simply allow it to dry completely. Apply 1 to 3 times daily, depending on the severity of your acne. If excessive dryness or peeling occurs, reduce application to once a day or every other day. For best results, use consistently and as part of your daily skincare routine.",
        "Ingredients": "Salicylic Acid, Alcohol Denat, Witch Hazel, Aloe Vera, Glycerin, Allantoin",
        "price": 70.99,
        "discount": 11.99,
        "imgUrl": "https://www.treeactiv.com/cdn/shop/products/TA-Acne-Face-Spray_600x.jpg?v=1690301371",
        "imgAlt": "a photo of Acne Spray Treatment",
        "category": "Face",
        "faves": [],
        "createdAt": Date.now()
    },

];
