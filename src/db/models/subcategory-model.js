import { model } from "mongoose";
import { subcategorySchema } from "../schemas/subcategory-schema.js";

const Subcategory = model("subcategories", subcategorySchema);

class SubcategoryModel {
  async findById(id) {
    const subcategory = await Subcategory.findById(id);
    return subcategory;
  }
}

const subcategoryModel = new SubcategoryModel();

export { subcategoryModel };
