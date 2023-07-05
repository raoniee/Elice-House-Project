import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema";

const Category = model("categories", categorySchema);

export { Category };