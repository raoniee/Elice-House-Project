import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

const categoryRouter = Router();

// 관리자 모드
// 카테고리 생성
categoryRouter.post("/admin/categories", CategoryController.createCat);

// 전체 카테고리 조회
categoryRouter.get("/admin/categories", CategoryController.getAllCat);

export { categoryRouter };