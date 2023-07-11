import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    // 상품 이름
    productName: {
      type: String,
      required: true,
    },
    // 상품 브랜드
    brand: {
      type: String,
      required: true,
    },
    // 상품 가격
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    // 상품이 포함된 자식 카테고리id
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },

    // 상품 이미지Url
    imageUrl: {
      type: String,
      required: true,
    },
    // 상품 상세 내용
    description: {
      type: String,
      required: true,
    },
    // 누적판매량
    soldQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    // 판매상태:
    saleStatus: {
      type: String,
      required: true,
      default: "판매준비중",
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { productSchema };
