import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';

const getCartProducts = app => {
    app.get('/cart', guard, async (req, res) => {
        try {
            if (!req.headers.authorization) {
                return res.status(403).send("U must signup");
                // const token = jwt.sign({
                //     userId: anonymousId,
                //     roleType: 1,
                // }, process.env.JWT_SECRET, { expiresIn: '1h' });
            }

            const { userId } = getUserFromTKN(req, res);
            const user = await User.findById(userId);

            const allProducts = await Product.find();

            const products = user.addToCart.map(item => {
                const product = allProducts.find(prod => prod._id.toString() === item.productId.toString());
                if (product) {
                    return {
                        ...product.toObject(),
                        quantity: item.quantity,
                        price: item.price,
                        addedAt: item.addedAt,
                        status: item.status,
                    };
                }
            }).filter(Boolean); // Filter out undefined values

            res.send(products);

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};

export default getCartProducts;
