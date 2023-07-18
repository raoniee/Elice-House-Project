import { Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
    // 자식 카테고리 이름
    subcategoryName: {
      type: String,
      required: true,
    },
    // 카테고리 내부 상품 총 갯수
    productQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    // 로컬 Date 저장.
    date: {
      type: String,
      required: false,
    },
  },
  {
    collection: "subcategories",
    timestamps: true,
  }
);

export { subcategorySchema };
