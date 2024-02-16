import mongoose from 'mongoose';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import User from '../../models/User.js';

const subtractFromCart = app => {
    app.patch('/cart/subtract/:id', guard, async (req, res) => {
        try {
            const productId = req.params.id;
            const { quantity, price } = req.body;
            const { userId } = getUserFromTKN(req, res);

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send('Invalid product ID');
            }
            if (productId === userId) {
                return res.status(400).send('Product ID cannot be the same as user ID');
            }

            if (!price) {
                return res.status(400).send('Please provide a valid price');
            }

            const user = await User.findById(userId);

            const updatedCart = user.addToCart.map(item => {
                if (item.productId.toString() === productId) {
                    if (item.quantity > 1) {
                        // item.quantity -= 1;
                        item.quantity = quantity;
                        return item;
                    }
                    return null; // If quantity is 1, remove the product from the cart by using filter(Boolean) - remove all null entries from the array,
                }
                return item;
            }).filter(Boolean);

            user.addToCart = updatedCart;
            await user.save();
            res.send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};

export default subtractFromCart;
