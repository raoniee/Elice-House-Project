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
      type: Number,
      required: true,
    },
    orderItem: [orderItemSchema],
  },
  {
    collection: "orders",
    timestamp: true,
  }
);

export { orderSchema };
