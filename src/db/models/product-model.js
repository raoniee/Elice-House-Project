import { model } from "mongoose";
import { productSchema } from "../schemas/product-schema.js";

const Product = model("products", productSchema);

class ProductModel {
  async findAll() {
    const allProduct = await Product.find({});
    return allProduct;
  }

  // 제품 추가
  async create(productInfo) {
    const createProduct = await Product.create(productInfo);
    return createProduct;
  }

  //productId로 상품 삭제
  async deleteByProductId(productId) {
    const deleteProduct = await Product.deleteOne({ _id: productId });
    return deleteProduct;
  }
  // subcategoryId에 해당하는 모든 상품 찾기
  async getSubcatProds(subcategoryId) {
    const getProds = await Product.find({ subcategoryId });
    return getProds;
  }

  // productId로 상품 찾기
  async getProdInfo(productId) {
    const getProd = await Product.findOne({ _id: productId });
    return getProd;
  }

  // product 정보 수정
  async update(_id, toUpdate) {
    const updateInfo = await Product.findOneAndUpdate({ _id }, toUpdate, {
      returnOriginal: false,
    });
    return updateInfo;
  }

  // 서브카테고리Id에 의한 상품 삭제
  async deleteBySubCat (subcategoryId) {
    const deleteBySubId = await Product.deleteMany({ subcategoryId })

    return deleteBySubId;
  }

}

const productModel = new ProductModel();

export { productModel };
