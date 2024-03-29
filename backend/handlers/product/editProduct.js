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
                return res.status(404).send('Product not found');
            }

            // Fetch the existing faves array from the product in the database
            const existingFaves = product.faves;

            const { error, value } = ProductValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            // Merge the incoming data with the existing product data, including faves
            const updatedProductData = {
                ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                ...value, // Incoming data from the request
                faves: existingFaves, // Include existing faves array
            };

            // Set the merged data to the product
            product.set(updatedProductData);

            await product.save();
            res.send(product);

        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default editProduct;
