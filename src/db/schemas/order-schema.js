import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    // 유저 아이디 or 비회원 아이디
    userId: {
      type: String,
      required: true,
    },
    // 주문한 유저 이름
    userName: {
      type: String,
      required: true,
    },
    // 주문한 유저 전화번호
    userPhoneNumber: {
      type: String,
      required: true,
    },
    // 우편번호
    addrNum: {
      type: String,
      required: true,
    },
    // 도로명 주소
    roughAddr: {
        type: String,
        required: true,
    },
    // 상세 주소
    detailAddr: {
        type: String,
        required: true,
    },
    //배송 상태
    state: {
        type: String,
        required: true,
        default: "배송준비중",
    },
    //배송 요청사항
    deliReq: {
      type: String,
      required: true,
      default: "선택 없음",
    }

  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { orderSchema };
