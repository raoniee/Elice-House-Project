import { Router } from "express";
import { OrderController } from "../controllers/order-controller.js";

const orderRouter = Router();

// 주문 추가
orderRouter.post("/orders", OrderController.createOrder);

// 전체 주문 조회
orderRouter.get("/orders/:userId", OrderController.getUserOrder);

//관리자 모드 
//전체 주문 조회
orderRouter.get("/admin/orders", OrderController.getAdminOrder);


export { orderRouter };