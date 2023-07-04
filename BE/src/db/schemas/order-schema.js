import { Schema } from "mongoose";
import { orderItemSchema } from "orderitem-schema";

const orderSchema = new Schema(
    {
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
    },{
        timestamp: true,
    }
);

export { orderSchema };