import { Schema } from "mongoose";
import { categorySchema } from "orderitem-schema";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
    timestamp: true,
  }
);

export { categorySchema };
