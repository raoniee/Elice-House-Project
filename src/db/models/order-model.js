import { model } from "mongoose";
import { orderSchema } from "../schemas/order-schema";

const Order = model("orders", orderSchema);

export { Order };