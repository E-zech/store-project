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
        "zip": "0452"
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
        "totalQuantity": 100,
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
        "totalQuantity": 80,
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
        "totalQuantity": 150,
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
        "totalQuantity": 150,
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
        "totalQuantity": 70,
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
        "totalQuantity": 80,
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
        "totalQuantity": 50,
        "createdAt": Date.now()
    },
    ////old ☝🏽

    {
        "title": "Anti-Aging Serum",
        "description": "Rejuvenate your skin with our powerful anti-aging serum. Formulated with advanced ingredients to reduce fine lines and wrinkles, leaving your skin looking youthful and radiant.",
        "howToUse": "Apply a small amount to cleansed skin before moisturizer. Gently massage in circular motions until fully absorbed.",
        "Ingredients": "Hyaluronic Acid, Retinol, Vitamin C, Peptides, Collagen",
        "price": 59.99,
        "discount": 9.99,
        "imgUrl": "https://images.pexels.com/photos/5904820/pexels-photo-5904820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Anti-Aging Face Serum",
        "category": "Face",
        "faves": [],
        "totalQuantity": 120,
        "createdAt": Date.now()
    },
    {
        "title": "Hydrating Cream",
        "description": "Revitalize tired eyes with our hydrating eye cream. Infused with nourishing ingredients to reduce puffiness and dark circles, revealing brighter and more refreshed eyes.",
        "howToUse": "Gently dab a small amount around the eye area using your ring finger. Use morning and night for best results.",
        "Ingredients": "Caffeine, Hyaluronic Acid, Vitamin E, Green Tea Extract, Peptides",
        "price": 29.99,
        "discount": 5.99,
        "imgUrl": "https://images.pexels.com/photos/5864110/pexels-photo-5864110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Hydrating Eye Cream",
        "category": "Eyes",
        "faves": [],
        "totalQuantity": 100,
        "createdAt": Date.now()
    },
    {
        "title": "Moisturizing Lotion",
        "description": "Nourish and hydrate your skin with our luxurious body lotion. Enriched with shea butter and essential oils, it absorbs quickly for soft and smooth skin all day long.",
        "howToUse": "Apply liberally to clean, dry skin and massage until fully absorbed. Use daily for best results.",
        "Ingredients": "Shea Butter, Coconut Oil, Jojoba Oil, Vitamin E, Lavender Extract",
        "price": 24.99,
        "discount": 4.99,
        "imgUrl": "https://images.pexels.com/photos/5904763/pexels-photo-5904763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Moisturizing Body Lotion",
        "category": "Body",
        "faves": [],
        "totalQuantity": 150,
        "createdAt": Date.now()
    },
    {
        "title": "Nourishing Cream",
        "description": "Protect and soften your hands with our nourishing hand cream. Infused with natural oils and vitamins, it absorbs quickly without leaving a greasy residue.",
        "howToUse": "Apply a small amount to hands and massage until fully absorbed. Reapply as needed throughout the day.",
        "Ingredients": "Argan Oil, Shea Butter, Vitamin E, Almond Oil, Aloe Vera",
        "price": 19.99,
        "discount": 3.99,
        "imgUrl": "https://images.pexels.com/photos/5904777/pexels-photo-5904777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Nourishing Hand Cream",
        "category": "Hands",
        "faves": [],
        "totalQuantity": 120,
        "createdAt": Date.now()
    },
    {
        "title": "Soothing Foot Cream",
        "description": "Relieve tired and achy feet with our soothing foot cream. Formulated with cooling menthol and moisturizing ingredients, it provides instant relief and hydration.",
        "howToUse": "Massage a generous amount onto clean, dry feet. Focus on areas of dryness or discomfort. Use daily for best results.",
        "Ingredients": "Menthol, Tea Tree Oil, Peppermint Oil, Shea Butter, Eucalyptus Extract",
        "price": 17.99,
        "discount": 3.49,
        "imgUrl": "https://images.pexels.com/photos/4324235/pexels-photo-4324235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Soothing Foot Cream",
        "category": "Feet",
        "faves": [],
        "totalQuantity": 100,
        "createdAt": Date.now()
    },
    {
        "title": "Gentle Cleanser",
        "description": "Cleanse your skin gently with our mild facial cleanser. Formulated with soothing ingredients, it removes impurities without stripping the skin's natural moisture barrier.",
        "howToUse": "Apply a small amount to damp skin and massage in circular motions. Rinse thoroughly with warm water. Use morning and night for best results.",
        "Ingredients": "Aloe Vera, Chamomile Extract, Glycerin, Coconut Oil, Green Tea Extract",
        "price": 19.99,
        "discount": 3.49,
        "imgUrl": "https://images.pexels.com/photos/5904837/pexels-photo-5904837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Gentle Facial Cleanser",
        "category": "Face",
        "faves": [],
        "totalQuantity": 150,
        "createdAt": Date.now()
    },
    {
        "title": "Brightening Cream",
        "description": "Brighten and illuminate your eye area with our specialized eye cream. Infused with brightening agents, it reduces the appearance of dark circles and puffiness for a refreshed look.",
        "howToUse": "Apply a pea-sized amount around the eye area using gentle tapping motions. Use morning and night for best results.",
        "Ingredients": "Vitamin C, Kojic Acid, Licorice Extract, Caffeine, Hyaluronic Acid",
        "price": 34.99,
        "discount": 6.99,
        "imgUrl": "https://images.pexels.com/photos/5939746/pexels-photo-5939746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Brightening Eye Cream",
        "category": "Eyes",
        "faves": [],
        "totalQuantity": 100,
        "createdAt": Date.now()
    },
    {
        "title": "Exfoliating Scrub",
        "description": "Achieve smoother and softer skin with our exfoliating body scrub. Enriched with natural exfoliants, it buffs away dead skin cells to reveal a radiant complexion.",
        "howToUse": "Massage onto damp skin in circular motions. Rinse thoroughly with warm water. Use 2-3 times a week for best results.",
        "Ingredients": "Brown Sugar, Coconut Oil, Shea Butter, Vitamin E, Peppermint Oil",
        "price": 29.99,
        "discount": 5.99,
        "imgUrl": "https://images.pexels.com/photos/5904767/pexels-photo-5904767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Exfoliating Body Scrub",
        "category": "Body",
        "faves": [],
        "totalQuantity": 120,
        "createdAt": Date.now()
    },
    {
        "title": "Moisturizing Mask",
        "description": "Treat your hands to a spa-like experience with our moisturizing hand mask. Infused with hydrating ingredients, it replenishes dry and rough hands for a soft and supple feel.",
        "howToUse": "Apply the gloves to clean hands and leave on for 15-20 minutes. Massage in any excess serum until fully absorbed. Use once a week for best results.",
        "Ingredients": "Shea Butter, Jojoba Oil, Vitamin E, Honey Extract, Collagen",
        "price": 24.99,
        "discount": 4.99,
        "imgUrl": "https://images.pexels.com/photos/4827260/pexels-photo-4827260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Moisturizing Hand Mask",
        "category": "Hands",
        "faves": [],
        "totalQuantity": 100,
        "createdAt": Date.now()
    },
    {
        "title": "Refreshing Spray",
        "description": "Revitalize tired and achy feet with our refreshing foot spray. Infused with cooling agents, it provides instant relief and leaves your feet feeling cool and refreshed.",
        "howToUse": "Spray onto clean, dry feet as needed. Focus on areas of discomfort or odor. Use throughout the day for a quick pick-me-up.",
        "Ingredients": "Menthol, Peppermint Oil, Tea Tree Oil, Eucalyptus Extract, Witch Hazel",
        "price": 14.99,
        "discount": 2.99,
        "imgUrl": "https://images.pexels.com/photos/4769350/pexels-photo-4769350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "imgAlt": "a photo of Refreshing Foot Spray",
        "category": "Feet",
        "faves": [],
        "totalQuantity": 80,
        "createdAt": Date.now()
    }

];
