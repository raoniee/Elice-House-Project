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
    // depth 생길 시 카테고리 아이디 정의 방법 궁금 
    categoryId: {
      type: Schema.types.objectID,
      ref: "categorySchema",
      required: true,
    },
    imageUrl: {
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
