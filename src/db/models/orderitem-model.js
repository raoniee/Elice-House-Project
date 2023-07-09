import { model } from "mongoose";
import { orderItemSchema } from "../schemas/orderitem-schema.js";

const Orderitem = model("orderItems", orderItemSchema);

class OrderitemModel {
    async create(newOrderitem) {
        const createOrderitem = await Orderitem.create(newOrderitem);
        return createOrderitem;
    }
}

const orderitemModel = new OrderitemModel();

export { orderitemModel };