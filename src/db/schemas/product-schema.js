import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    // 상품 이름
    name: {
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
<<<<<<< HEAD
      required: true,
      default: 0,
    }

=======
      required: false,
      default: 0,
    },
>>>>>>> 51f1288 (Feat: 전체 상품 조회, 상품 추가 기능 구현)
  },
  {
    collection: "products",
    timestamp: true,
  }
);

export { productSchema };
