import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  // depth ...
  {
    collection: "categories",
    timestamp: true,
  }
);

export { categorySchema };
