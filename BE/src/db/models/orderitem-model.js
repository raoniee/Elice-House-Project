import { model } from "mongoose";
import { orderItemSchema } from "../schemas/orderitem-schema";

const Orderitem = model("orderItems", orderItemSchema);

export { Orderitem };