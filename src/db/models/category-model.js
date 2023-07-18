import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema.js";

const Category = model("categories", categorySchema);

class CategoryModel {
  // 카테고리 생성
  async create(categoryName) {
    const createCat = await Category.create({ categoryName });

    return createCat;
  }
  // 모든 카테고리 정보 가져오기.
  async findAll() {
    const allCat = await Category.find({});

    return allCat;
  }

  // 업데이트(카테고리 생성 관련)
  async refSubcat(categoryId, addSubcatId) {
    const updateCat = await Category.findOneAndUpdate(
      { _id: categoryId }, // 카테고리의 ObjectId
      { $push: { subcategory: addSubcatId } },
      { returnOriginal: false }
    );

    return updateCat;
  }

  // 카테고리이름으로 카테고리 찾기
  async findByCat(categoryName) {
    const cat = await Category.findOne({ categoryName });

    return cat;
  }

  // 카테고리 수정
  async update(catId, toUpdate) {
    const updateInfo = await Category.findOneAndUpdate(
      { _id: catId },
      toUpdate,
      {
        returnOriginal: false,
      }
    );
    return updateInfo;
  }

  // 서브카테고리에 의한 카테고리 업데이트 및 삭제
  async updateSubCat(categoryId, subcategoryId) {
    const catInfo = await Category.findById({ _id: categoryId });
    const subIdsInCat = catInfo.subcategory;
    const newSubIdsInCat = [];

    for (const subId of subIdsInCat) {
      if (subcategoryId != subId) {
        newSubIdsInCat.push(subId);
      }
    }

    if (newSubIdsInCat.length === 0) {
      await Category.deleteOne({ _id: categoryId });
    }

    const updateSubId = await Category.findOneAndUpdate(
      { _id: categoryId },
      { subcategory: newSubIdsInCat },
      {
        returnOriginal: false,
      }
    );

    return updateSubId;
  }

  async findById(_id) {
    const allCat = await Category.findById({ _id });
    return allCat;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
