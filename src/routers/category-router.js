import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

const categoryRouter = Router();

// 관리자 모드
// 카테고리 생성
categoryRouter.post("/admin/categories", CategoryController.createCat);

// 전체 카테고리 조회
categoryRouter.get("/admin/categories", CategoryController.getAllCatAdmin);

// 카테고리 수정
categoryRouter.patch("/admin/categories/:categoryId", CategoryController.updateCat);

categoryRouter.delete("/admin/categories/:subcategoryId", CategoryController.deleteCat);

//유저 모드 
// 전체 카테고리 조회
categoryRouter.get("/categories", CategoryController.getAllCat);

//유저 모드
// 전체 카테고리 조회
categoryRouter.get("/categories", CategoryController.getAllCat);
export { categoryRouter };
