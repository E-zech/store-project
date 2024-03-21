import createOrder from "../handlers/order/createOrder.js";
import getOrder from "../handlers/order/getOrder.js";

export default function orderRoutes(app) {
    createOrder(app);
    getOrder(app);
};    