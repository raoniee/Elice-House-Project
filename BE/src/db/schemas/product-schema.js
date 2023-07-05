import { Schema } from "mongoose";
import { productSchema } from "./category-schema";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.types.objectID,
      ref: "categorySchema",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: "products",
    timestamp: true,
  }
);

export { productSchema };
