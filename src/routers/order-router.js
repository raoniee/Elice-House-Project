import { Router } from "express";
import { OrderController } from "../controllers/order-controller.js";

const orderRouter = Router();

// 주문 추가
orderRouter.post("/orders", OrderController.createOrder);


export { orderRouter };