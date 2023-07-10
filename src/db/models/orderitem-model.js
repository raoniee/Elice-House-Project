import { model } from "mongoose";
import { orderItemSchema } from "../schemas/orderitem-schema.js";

const OrderItem = model("orderItems", orderItemSchema);

class OrderitemModel {
    async create(newOrderitem) {
        const createOrderitem = await OrderItem.create(newOrderitem);
        return createOrderitem;
    }

    async getOrderItem(userId) {
        const orderItemInfo = await OrderItem.find({ userId });
        return orderItemInfo;
    }

    async getOrderOne(orderId) {
        const orderOneInfo = await OrderItem.find({ orderId });
        return orderOneInfo;
    }

    async getAll() {
        const All = await OrderItem.find({});
        return All;
    }
}

const orderitemModel = new OrderitemModel();

export { orderitemModel };