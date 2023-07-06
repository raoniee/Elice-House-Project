import { Schema } from "mongoose";
import { orderItemSchema } from "orderitem-schema";

const orderSchema = new Schema(
  {
    orderID: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.types.ObjectId,
      ref: "users",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    roughAddr: {
        type: String,
        required: true,
    },
    detailAddr: {
        type: String,
        required: true,
    },
    orderItem: [orderItemSchema],
    state: {
        type: String,
        required: true,
        default: "배송준비중",
    },
  },
  {
    collection: "orders",
    timestamp: true,
  }
);

export { orderSchema };
