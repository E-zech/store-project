import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import User from '../../models/User.js';

const add2cart = app => {
    app.post('/cart/add/:id', guard, async (req, res) => {
        try {
            const productId = req.params.id;
            const { quantity, price } = req.body;

            if (!productId) {
                return res.status(400).send('Please provide a valid product ID');
            }

            if (!price) {
                return res.status(400).send('Please provide a valid price');
            }

            if (!req.headers.authorization) {
                return res.status(403).send("You must be signed in");
            }

            const { userId } = getUserFromTKN(req, res);

            const user = await User.findById(userId);
            let existingProduct = user.addToCart.find(item => item.productId === productId);

            if (existingProduct) {
                // If the product already exists in addToCart, update its quantity
                existingProduct.quantity += quantity;
                existingProduct.price = price; // Update the price too, if necessary
            } else {
                // If the product doesn't exist in addToCart, add it
                user.addToCart.push({ productId, quantity, price });
            }

            await user.save();
            res.send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
}

export default add2cart;

