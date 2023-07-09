import { model } from "mongoose";
import { orderSchema } from "../schemas/order-schema.js";

const Order = model("orders", orderSchema);

class OrderModel {
    async create(newOrder) {
        const createOrder = await Order.create(newOrder);
        return createOrder;
    }
}

const orderModel = new OrderModel();

export { orderModel };