import { model } from "mongoose";
import { orderSchema } from "../schemas/order-schema.js";

const Order = model("orders", orderSchema);

class OrderModel {
  async create(newOrder) {
    const createOrder = await Order.create(newOrder);
    return createOrder;
  }

  async getOrder(userId) {
    const orderInfo = await Order.find({ userId });
    return orderInfo;
  }

  async getAll() {
    const All = await Order.find({});
    return All;
  }

  async update(orderId, toUpdate) {
    const updateInfo = await Order.findOneAndUpdate({ _id: orderId }, toUpdate, {
      returnOriginal: false,
    });
    return updateInfo;
  }

  //orderID로 유저 찾기
  async findByUserId(orderId) {
    const order = await Order.findById(orderId);
    return order;
  }

  // orderId로 order 삭제
  async deleteByOrderId(orderId) {
    const deleteOrder = await Order.deleteOne({ _id: orderId });
    return deleteOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
