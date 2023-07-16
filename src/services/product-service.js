import path from "path";
import { userInfo } from "os";
import { productModel } from "../db/models/product-model.js";
import { categoryModel } from "../db/models/category-model.js";
import { subcategoryModel } from "../db/models/subcategory-model.js";
import { error } from "console";
import { userModel } from "../db/models/user-model.js";
import moment from "moment-timezone";

class ProductService {
  // 각 상품에 카테고리 이름, 서브카테고리 이름 추가
  async getAllProductInfo() {
    const allProductInfo = await productModel.findAll();
    const newAllProductInfo = [];

    for (const productInfo of allProductInfo) {
      const {
        saleStatus,
        _id,
        productName,
        brand,
        price,
        categoryId,
        subcategoryId,
        imageUrl,
        description,
        soldQuantity,
        createdAt,
        updatedAt,
      } = productInfo;

      const productSubcatId = subcategoryId;
      const subcat = await subcategoryModel.findById(productSubcatId);
      const subcategoryName = subcat.subcategoryName;
      const productCatId = categoryId;
      const cat = await categoryModel.findById(productCatId);
      const categoryName = cat.categoryName;

      const newProductInfo = {
        categoryName,
        subcategoryName,
        productName,
        brand,
        price,
        imageUrl,
        description,
        saleStatus,
        soldQuantity,
        _id,
        createdAt,
        updatedAt,
      };

      newAllProductInfo.push(newProductInfo);
    }

    return newAllProductInfo;
  }

  // 상품 추가
  async addProduct(newProduct) {
    const {
      categoryName,
      subcategoryName,
      productName,
      price,
      imageUrl,
      brand,
      description,
    } = newProduct;

    const ProductInfo = {
      productName,
      price,
      imageUrl,
      brand,
      description,
    };
    const parentCat = await categoryModel.findByCat(categoryName);

    if (!parentCat) {
      throw new Error("존재하지 않는 카테고리입니다.");
    }
    ProductInfo.categoryId = parentCat._id;

    const childCatIds = parentCat.subcategory;
    // 부모 카테고리 내에 있는 자식 카테고리 id로 가져온 서브카테고리 이름에 해당하는 id 찾기.
    for (const childCatId of childCatIds) {
      const childCat = await subcategoryModel.findById(childCatId);
      // 같은 카테고리가 있다면
      if (childCat.subcategoryName == subcategoryName) {
        ProductInfo.subcategoryId = childCat._id;
      }
    }

    if (!ProductInfo.subcategoryId) {
      throw new Error(`${categoryName}존재하지 않는 서브카테고리입니다.`);
    }

    const addNewProduct = await productModel.create(ProductInfo);
    // 로컬 Date 업데이트
    const postDate = moment.tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss");
    await productModel.update(addNewProduct._id, { date: postDate });

    // 누적 상품 판매 수 체크
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

  // 서브아이템 아이디 가지고 상품 가져오기
  async getSubcatProdsById(subcatId) {
    const subcatProds = await productModel.getSubcatProds(subcatId);

    return subcatProds;
  }

  async getProdById(productId) {
    const prodInfo = await productModel.getProdInfo(productId);
    return prodInfo;
  }

  // 상품 정보 수정
  async updateInfo(productId, toUpdate) {
    const { categoryName, subcategoryName } = toUpdate;
    if (categoryName && subcategoryName) {
      const parentCat = await categoryModel.findByCat(categoryName);
      if (!parentCat) {
        throw new Error("존재하지 않는 카테고리입니다.");
      }

      const childCats = parentCat.subcategory;
      const productSubCatId = await subcategoryModel.findByName(
        subcategoryName
      );
      let isSubCategoryExist = false;

      for (const childCatId of childCats) {
        if (childCatId.toString() == productSubCatId._id.toString()) {
          isSubCategoryExist = true;
          break;
        }
      }

      toUpdate.categoryId = parentCat._id;
      toUpdate.subcategoryId = productSubCatId._id;

      // 카테고리가 존재하는지 확인
      if (!isSubCategoryExist) {
        throw new Error(`해당 카테고리에 존재하지 않는 서브카테고리입니다.`);
      }
    }
    const checkUpdate = await productModel.update(productId, toUpdate);

    return checkUpdate;
  }
}

const productService = new ProductService();

export { productService };
