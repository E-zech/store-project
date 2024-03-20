import createOrder from "../handlers/order/createOrder.js";

export default function orderRoutes(app) {
    createOrder(app);
};    