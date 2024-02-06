import Product from '../../models/Product.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';

const getFavesProducts = app => {
    app.get('/products/my-faves-products', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const myFavesProducts = await Product.find({ faves: userId });

            // if error use : const myFavesProducts = await Product.find({ faves: userId.toString() });


            if (!myFavesProducts || myFavesProducts.length === 0) {
                return res.status(404).send('You dont have products');
            }

            res.send({
                message: `Here are your products:`,
                myFavesProducts: myFavesProducts
            });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getFavesProducts;