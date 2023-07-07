import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    childCategoryName: {
      type: [String],
      required: false,
    },
    // childCategoryName: {
    //   type: new Schema({
    //     name: String,
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //   }),
    //   required: false,
    // },
    // 코치님께서 다시 답을 주신다고 하심!
  },
  {
    collection: "categories",
    timestamp: true,
  }
);

export { categorySchema };
