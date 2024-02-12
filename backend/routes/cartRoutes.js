import add2cart from '../handlers/cart/add2cart.js';
import getCartProducts from '../handlers/cart/getCartProducts.js';


export default function cardRoutes(app) {
    add2cart(app);
    getCartProducts(app);
};  