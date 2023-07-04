import { Schema } from "mongoose";

const productSchema = new Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        prire: {
            type: Number,
            required: true,
        },
        categoryId:{
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        }, 
        description: {
            type: String,
            required: true,
        }
    },{
        collection: "products",
        timestamp: true,
    }
);

export { productSchema };