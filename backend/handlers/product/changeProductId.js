import Product from '../../models/Product.js';
import { productNumberIsValid } from '../../validation/productJoi.js';
import { adminGuard, guard } from '../../middleware/guard.js';

const changeProductId = app => {
    app.patch('/products/productId/:id', guard, adminGuard, async (req, res) => {
        try {
            const paramsId = req.params.id;
            const product = await Product.findById(paramsId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            const { error, value } = productNumberIsValid.validate(req.body);
            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const checkProductId = await Product.findOne({ productId: value.productId });

            if (checkProductId) {
                return res.status(409).send('ProductId already exists');
            }

            product.productId = value.productId;
            product.set(value);

            await product.save();
            res.send({
                message: 'You have changed the productId successfully',
                product
            });

        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default changeProductId;
