import { userInfo } from "os";
import { productModel } from "../db/models/product-model.js";
import { categoryModel } from "../db/models/category-model.js";
import { subcategoryModel } from "../db/models/subcategory-model.js";

import { error } from "console";

class ProductService {
  async getAllProductInfo() {
    const allProductInfo = await productModel.findAll();

    return allProductInfo;
  }
  // 상품 추가
  async addProduct(newProduct) {
    const categoryName = newProduct.categoryName;
    const subcategoryName = newProduct.subcategoryName;
    const name = newProduct.name;
    const price = newProduct.price;
    const imageUrl = newProduct.imageUrl;
    const brand = newProduct.brand;
    const description = newProduct.description;

    const ProductInfo = {
      name,
      price,
      imageUrl,
      brand,
      description,
    };

    const parentCat = await categoryModel.findByCat(categoryName);
    if (!parentCat) {
      throw new Error("존재하지 않는 카테고리입니다.");
    }

    // console.log(parentCat);

    const childCats = parentCat.subcategory;
    // 부모 카테고리 내에 있는 자식 카테고리 id로 가져온 서브카테고리 이름에 해당하는 id 찾기

    for (const childcCatId of childCats) {
      const childCat = await subcategoryModel.findById(childcCatId);
      if (childCat.subcategoryName == subcategoryName) {
        ProductInfo.subcategoryId = childCat._id;
        console.log(ProductInfo);
      }
    }

    console.log(ProductInfo);

    const addNewProduct = await productModel.create(ProductInfo);

    return addNewProduct;
  }
}

const productService = new ProductService();

export { productService };
