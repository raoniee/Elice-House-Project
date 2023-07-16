import { model } from "mongoose";
import { subcategorySchema } from "../schemas/subcategory-schema.js";

const Subcategory = model("subcategories", subcategorySchema);

class SubcategoryModel {
  async create(subcategoryName) {
    const createSubcat = await Subcategory.create({ subcategoryName });
    return createSubcat;
  }

  async findById(_id) {
    const subcategory = await Subcategory.findById({ _id });
    return subcategory;
  }

  async findAll() {
    const allsubcat = await Subcategory.find({});

    return allsubcat;
  }

  // 서브카테고리 업데이트
  async update(subcatId, toUpdate) {
    const updateInfo = await Subcategory.findOneAndUpdate(
      { _id: subcatId },
      toUpdate,
      {
        returnOriginal: false,
      }
    );
    return updateInfo;
  }

  // 이름에 의한 서브카테고리 삭제
  async findByName(subcategoryName) {
    const subcat = await Subcategory.findOne({ subcategoryName });

    return subcat;
  }

  // 아이디에 의한 서브카테고리 삭제.
  async deleteSubCat(subcategoryId) {
    const deleteById = await Subcategory.deleteOne({ _id: subcategoryId });

    return deleteById;
  }
}
const subcategoryModel = new SubcategoryModel();

export { subcategoryModel };
