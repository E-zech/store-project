import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';

const add2cart = app => {
    app.post('/cart/add/:id', guard, async (req, res) => {
        try {
            const paramsId = req.params.id;
            const { quantity, price } = req.body;
            const { userId } = getUserFromTKN(req, res);

            if (!mongoose.Types.ObjectId.isValid(paramsId)) {
                return res.status(400).send('Invalid product ID');
            }

            if (paramsId === userId) {
                return res.status(400).send('Product ID cannot be the same as user ID');
            }

            if (!price) {
                return res.status(400).send('Please provide a valid price');
            }

            if (!quantity || quantity < 1) {
                return res.status(400).send('Please provide quantity , quantity must be bigger than 0');
            }

            const user = await User.findById(userId);
            const product = await Product.findById(paramsId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            const existingCartItem = user.addToCart.find(item => item.productId.toString() === paramsId);

            if (existingCartItem) {
                // If product already exists in cart, update quantity and price
                existingCartItem.quantity = quantity;
                existingCartItem.price = price;
            } else {
                // If product not in cart, add it
                user.addToCart.push({ productId: paramsId, quantity, price });
            }

            await user.save();
            const updatedCartProducts = await Promise.all(user.addToCart.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (product) {
                    return {
                        ...product.toObject(),
                        quantity: item.quantity,
                        price: item.price,
                    };
                } else {
                    return null;
                }
            }));

            res.send(updatedCartProducts.filter(Boolean));
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
}

export default add2cart;

