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
    console.log(productInfo);
    const createProduct = await Product.create(productInfo);
    console.log(createProduct);
    return createProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
