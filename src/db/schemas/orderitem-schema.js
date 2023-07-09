import { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    // 주문 번호
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    // 주문한 상품 Id
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    // 주문한 상품 이름
    productName: {
      type: String,
      required: true,
    },
    // 주문한 상품 이미지
    productImg: {
      type: String,
      ref: "products",
      required: true,
    },
    // 주문한 상품 수량
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "orderItems",
    timestamp: true,
  }
);
export { orderItemSchema };
