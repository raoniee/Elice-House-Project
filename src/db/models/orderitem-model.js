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
  async getOrderId(orderId) {
    const orderOneInfo = await OrderItem.find({ orderId });
    return orderOneInfo;
  }

  async getAll() {
    const All = await OrderItem.find({});
    return All;
  }

  async getOrderOne(orderId) {
    const orderOneInfo = await OrderItem.findOne({ orderId });
    return orderOneInfo;
  }

  // orderId를 가지고 orderItem들 삭제
  async deleteByOrderId(orderId) {
    const deleteData = await OrderItem.deleteMany({ orderId });
    return deleteData;
  }
}

const orderitemModel = new OrderitemModel();

export { orderitemModel };
