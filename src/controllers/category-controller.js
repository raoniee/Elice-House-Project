import { categoryService } from "../services/category-service.js";

const CategoryController = {
  // 모든 카테고리 조회
  async getAllCat(req, res, next) {
    try {
      const getAllCat = await categoryService.getAllCatService();

      res.status(200).json(getAllCat);
    } catch (error) {
      next(error);
    }
  },
  // 카테고리 생성
  async createCat(req, res, next) {
    try {
      const { categoryName, subcategoryName } = req.body;

      const newCat = await categoryService.addCat({
        categoryName,
        subcategoryName,
      });

      res.status(200).json(newCat);
    } catch (error) {
      next(error);
    }
  },
};

export { CategoryController };
