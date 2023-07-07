import { model } from "mongoose";
import { productSchema } from "../schemas/product-schema";

const Product = model("products", productSchema);

export { Product };