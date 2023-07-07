import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    // 부모 카테고리 이름 
    categoryName: {
      type: String,
      required: true,
    },
    // 자식 카테고리 참조 
    subcategory : [{
      type : Schema.Types.ObjectId,
      ref : 'Subcategory'
     }]
  },
  {
    collection: "categories",
    timestamp: true,
  }
);

export { categorySchema };
