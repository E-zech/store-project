import User from '../models/User.js';
import Product from '../models/Product.js';
import { users, products } from './initial-dataJSON.js';

export const initialDataStart = async () => {
    const userAmount = await User.find().countDocuments();

    if (!userAmount) {
        for (const u of users) {
            const user = new User(u);
            await user.save();
        }
        for (const p of products) {
            const product = new Product(p);
            await product.save();
        }
    }
}


