import Product from '../../models/Product.js';
import { ProductValid } from '../../validation/productJoi.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard, adminGuard } from '../../middleware/guard.js';

const editProduct = app => {
    app.put('/products/:id', guard, adminGuard, async (req, res) => {
        try {
            const productId = req.params.id; // id of the product from the params

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send('product not found');
            }

            const { error, value } = ProductValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            product.set(value);
            await product.save();
            res.send(product);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}
export default editProduct;