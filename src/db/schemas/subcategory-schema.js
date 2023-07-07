import { Schema } from "mongoose";

const subCategorySchema = new Schema(
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

export { subCategorySchema };

// 삭제하면됨(코치님)
