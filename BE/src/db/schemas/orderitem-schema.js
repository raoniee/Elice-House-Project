import { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
        productId: {
            type: Schema.types.objectID,
            ref: "products",
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productImg: {
            type: Schema.types.objectID,
            ref: "products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },{
        timestamp: true,
    }
);
export { orderItemSchema };