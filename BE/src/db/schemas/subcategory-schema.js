import { Schema } from "mongoose";

const subCategorySchema = new Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
    },
  },
  // depth ...
  {
    collection: "subcategories",
    timestamp: true,
  }
);

export { subCategorySchema };

// 삭제하면 됨(코치님)
