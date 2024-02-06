import { guard } from '../../middleware/guard'
import { randomObjectId } from '../../models/Product.js'

const add2cart = app => { //req.params.id => productId  req.body => quantity 
    app.post('/cart/add/:id', async (req, res) => {
        try {
            if (!req.headers.authorization) {
                const anonymousId = randomObjectId();

                const token = jwt.sign({
                    userId: anonymousId,
                    roleType: 1,
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
            }
            const { userId } = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
            userId

        } catch (err) {

        }
    })
}
export default add2cart;
