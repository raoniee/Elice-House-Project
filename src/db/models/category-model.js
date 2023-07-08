import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema.js";

const Category = model("categories", categorySchema);

class CategoryModel {
  // 모든 카테고리 정보 가져오기
  async findAll() {
    const allCat = await Category.find({});

    return allCat;
  }
  // 카테고리이름으로 카테고리 찾기
  async findByCat(catName) {
    const cat = await Category.findOne({ categoryName: catName });
    return cat;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
