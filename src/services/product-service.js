import { userInfo } from "os";
import { productModel } from "../db/models/product-model.js";
import { categoryModel } from "../db/models/category-model.js";
import { subcategoryModel } from "../db/models/subcategory-model.js";

import { error } from "console";
import { userModel } from "../db/models/user-model.js";

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

    const childCats = parentCat.subcategory;
    // 부모 카테고리 내에 있는 자식 카테고리 id로 가져온 서브카테고리 이름에 해당하는 id 찾기

    for (const childCatId of childCats) {
      const childCat = await subcategoryModel.findById(childCatId);
      // 같은 카테고리가 있다면
      if (childCat.subcategoryName == subcategoryName) {
        ProductInfo.subcategoryId = childCat._id;
      }
    }

    if (!ProductInfo.subcategoryId) {
      throw new Error("존재하지 않는 서브카테고리입니다.");
    }

    const addNewProduct = await productModel.create(ProductInfo);

    if (addNewProduct) {
      const subcatId = ProductInfo.subcategoryId;
      const subcatProds = await productModel.getSubcatProds(subcatId);
      const subcatProdsNum = subcatProds.length;
      const updateSubcatQnt = await subcategoryModel.update(subcatId, {
        productQuantity: subcatProdsNum,
      });
    }

    return addNewProduct;
  }

  // productId를 가지고 product 정보 삭제
  async deleteById(productId) {
    const deleteInfo = await productModel.deleteByProductId(productId);

    if (deleteInfo.deletedCount === 0) {
      throw new Error("제품 삭제 실패");
    }

    return { result: "success" };
  }

  // productId를 가지고 product 정보 삭제
  async getSubcatProdsById(subcatId) {
    const subcatProds = await productModel.getSubcatProds(subcatId);

    return subcatProds;
  }

  async getProdById(productId) {
    const prodInfo = await productModel.getProdInfo(productId);
    return prodInfo;
  }
}

const productService = new ProductService();

export { productService };
