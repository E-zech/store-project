import Product from '../../models/Product.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';

const likeProduct = app => {
    app.patch('/products/:id', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const paramsId = req.params.id;
            let message = '';

            const product = await Product.findOne({ productId: paramsId });

            if (!product) {
                return res.status(404).send('product not found');
            }

            const isLikedByUser = product.faves.includes(userId);

            if (isLikedByUser) {
                product.faves = product.faves.filter(id => id.toString() !== userId);
                message = 'You unliked this product.';

            } else {
                product.faves.push(userId);
                message = 'You liked this product.';
            }
            await product.save();
            res.send({ message, product });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default likeProduct;