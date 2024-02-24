import add2cart from '../handlers/cart/add2cart.js';
import getCartProducts from '../handlers/cart/getCartProducts.js';
import deleteFromCart from '../handlers/cart/deleteFromCart.js';
import subtractFromCart from '../handlers/cart/subtractFromCart.js';


export default function cardRoutes(app) {
    add2cart(app);
    getCartProducts(app);
    deleteFromCart(app);
    subtractFromCart(app);

};  