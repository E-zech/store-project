import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';

const getOrder = app => {
    app.get('/my-orders', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const orders = await Order.find({ userId });

            res.send(orders);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};

export default getOrder;
