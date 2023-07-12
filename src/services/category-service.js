import { categoryModel } from "../db/models/category-model.js";
import { subcategoryModel } from "../db/models/subcategory-model.js";
import { productModel } from "../db/models/product-model.js";

class CategoryService {
  // 카테고리 생성
  async addCat(newCat) {
    const categoryName = newCat.categoryName;
    const subcategoryName = newCat.subcategoryName;

    // 부모 카테고리 중복 확인
    const category = await categoryModel.findByCat(categoryName);
    if (category) {
      // 서브 카테고리 생성
      const subCatinCats = category.subcategory;

      for (const subcatId of subCatinCats) {
        const subcat = await subcategoryModel.findById(subcatId);
        const name = subcat.subcategoryName;

        if (subcategoryName == name) {
          throw new Error("이미 존재하는 서브 카테고리입니다.");
          return;
        }
      }

      const addSubcat = await subcategoryModel.create(subcategoryName);
      console.log("add -> ", addSubcat);
      if (!addSubcat) {
        throw new Error("서브 카테고리가 만들어지지 않았습니다.");
      }

      const categoryId = category._id;
      const addSubcatId = addSubcat._id;

      // 부모 카테고리에 서브 카테고리 참조
      const subcatRefcat = await categoryModel.refSubcat(
        categoryId,
        addSubcatId
      );

      return subcatRefcat;
    } else {
      // 부모 카테고리 생성 
      const createCat = await categoryModel.create(categoryName);
      const addSubcat = await subcategoryModel.create(subcategoryName);

      const newCatId = createCat._id;
      const newSubcatId = addSubcat._id;

      // 부모 카테고리에 서브 카테고리 참조 
      const subcatRefcat = await categoryModel.refSubcat(newCatId, newSubcatId);

      return subcatRefcat;
    }
  }

  // 전체 카테고리 정보 조회
  async getAllCatService() {
    const allCatInfo = await categoryModel.findAll();
    // const allSubcatInfo = await subcategoryModel.findAll();
    const AllCategory = [];

    for (const catInfo of allCatInfo) {
      const catIds = catInfo.subcategory;

      for (const subcatId of catIds) {
        const subcatInCat = await subcategoryModel.findById(subcatId);
        if (subcatInCat) {
          const res = {};
          const subcatId = subcatInCat._id;
          const subcatName = subcatInCat.subcategoryName;
          const subcatProductQuantity = subcatInCat.productQuantity;

          // response로 보내줄 객체 생성!!
          res.categoryId = catInfo._id;
          res.subcategoryId = subcatId;
          res.categoryName = catInfo.categoryName;
          res.subcategoryName = subcatName;
          res.productQauntity = subcatProductQuantity;

          AllCategory.push(res);
        }
      }
    }

    return { AllCategory };
  }

  async getAllCategory() {
    const allCatInfo = await categoryModel.findAll();
    const AllCategory = [];

    for (const catInfo of allCatInfo) {
      const res = {};
      const subResArr = [];
      const subCatIds = catInfo.subcategory;

      res.categoryName = catInfo.categoryName;
      res.categoryId = catInfo._id;

      for (const subCatId of subCatIds) {
        console.log("subCatId : ", subCatId);
        const subcatInCat = await subcategoryModel.findById(subCatId);
        console.log("subcatInCat : ", subcatInCat);
        if (subcatInCat) {
          const subRes = {};
          const subcategoryName = subcatInCat.subcategoryName;
          const subcategoryId = subcatInCat._id;

          subRes.subcategoryName = subcategoryName;
          subRes.subcategoryId = subcategoryId;

          subResArr.push(subRes);
        }
        res.subcategory = subResArr;
      }
      AllCategory.push(res);
    }

    return AllCategory;
  }

  async changeCat(changeInfo) {
    const categoryId = changeInfo.categoryId;
    const changeCategoryName = changeInfo.changeCategoryName;
    const subcategoryId = changeInfo.subcategoryId;
    const changeSubcategoryName = changeInfo.changeSubcategoryName;

    const catUpdate = await categoryModel.update(categoryId, {
      categoryName: changeCategoryName,
    });
    const subCatUpdate = await subcategoryModel.update(subcategoryId, {
      subcategoryName: changeSubcategoryName,
    });

    return { catUpdate, subCatUpdate };
  }

  async deleteSubCat(subcategoryId, categoryId) {
    // 서브카테고리 삭제
    const deleteSubCat = await subcategoryModel.deleteSubCat(subcategoryId);
    // 서브카테고리Id에 의한 상품 삭제
    const deleteAllSubCat = await productModel.deleteBySubCat(subcategoryId);
    // 서브카테고리 삭제에 의한 카테고리 데이터 업데이트
    const updateCat = await categoryModel.updateSubCat(
      categoryId,
      subcategoryId
    );

    return { deleteSubCat, deleteAllSubCat, updateCat };
  }
}

const categoryService = new CategoryService();

export { categoryService };
