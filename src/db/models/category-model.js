import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema.js";

const Category = model("categories", categorySchema);

class CategoryModel {

  // 카테고리 생성
  async create(categoryName) {
    console.log(String(categoryName));
    const createCat = await Category.create({ categoryName });

    return createCat;
  }
  // 모든 카테고리 정보 가져오기
  async findAll() {
    const allCat = await Category.find({});

    return allCat;
  }
  // 카테고리이름으로 카테고리 찾기
  async findByCat(categoryName) {
    const cat = await Category.findOne({ categoryName });

    return cat;
  }

  // 카테고리 내부에서 서브 카테고리 찾기
  async findBySubcat(addSubcatId) {
    const subcat = await Category.findOne({
      subcategory: { subcategory: addSubcatId },
    });
    return subcat;
  }

  // 업데이트
  async refSubcat(categoryId, addSubcatId) {
    const updateCat = await Category.findOneAndUpdate(
      { _id: categoryId }, // 카테고리의 ObjectId
      { $push: { subcategory: addSubcatId } },
      { new: true }
    )
      .then((updatedCategory) => {
        // 업데이트된 카테고리
        console.log(updatedCategory);
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });

    return updateCat;
  }
  // 모든 카테고리 정보 가져오기
  async findAll() {
    const allCat = await Category.find({});

    return allCat;
  }

  // 카테고리이름으로 카테고리 찾기
  // async findByCat(catName) {
  //   const cat = await Category.findOne({ categoryName: catName });
  //   return cat;
  // }

  // 카테고리 생성
  async create(categoryName) {
    console.log(String(categoryName));
    const createCat = await Category.create({ categoryName });

    return createCat;
  }
  // 모든 카테고리 정보 가져오기
  async findAll() {
    const allCat = await Category.find({});

    return allCat;
  }
  // 카테고리이름으로 카테고리 찾기
  async findByCat(categoryName) {
    const cat = await Category.findOne({ categoryName });

    return cat;
  }

  // 카테고리 내부에서 서브 카테고리 찾기
  async findBySubcat(addSubcatId) {
    const subcat = await Category.findOne({
      subcategory: { subcategory: addSubcatId },
    });
    return subcat;
  }

  // 업데이트
  async refSubcat(categoryId, addSubcatId) {
    const updateCat = await Category.findOneAndUpdate(
      { _id: categoryId }, // 카테고리의 ObjectId
      { $push: { subcategory: addSubcatId } },
      { new: true }
    )
      .then((updatedCategory) => {
        // 업데이트된 카테고리
        console.log(updatedCategory);
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });

    return updateCat;
  }

  // id로 카테고리 찾기
  async findById(_id) {
    const cat = await Category.findOne({ _id });
    return cat;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
