import { Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
    // 자식 카테고리 이름
    subcategoryName: {
      type: String,
      required: true,
    },
  },
  {
    collection: "subcategories",
    timestamp: true,
  }
);

export { subcategorySchema };
