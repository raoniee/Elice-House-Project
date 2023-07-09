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
    } 
  },
  {
    collection: "subcategories",
    timestamp: true,
  }
);

export { subcategorySchema };

// 삭제하면됨(코치님)
