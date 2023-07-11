import { categoryService } from "../services/category-service.js";

const CategoryController = {
  // 모든 카테고리 조회 관리자
  async getAllCatAdmin(req, res, next) {
    try {
      const getAllCat = await categoryService.getAllCatService();

            res.status(200).json(getAllCat);
        } catch(error) {
            next(error);
        }
    },

    async getAllCat(req, res, next) {
      try {
        const getAllCat = await categoryService.getAllCategory();
  
              res.status(200).json(getAllCat);
          } catch(error) {
              next(error);
          }
      },

    // 카테고리 생성
    async createCat(req, res, next) {
        try{
            const categoryName = req.body.categoryName;
            const subcategoryName = req.body.subcategoryName;
            const newCat = await categoryService.addCat({
                categoryName,
                subcategoryName
            });

            res.status(201).json(newCat);
        } catch(error) {
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

  // 카테고리 수정 
  async updateCat(req, res, next) {
    try{
      const categoryId = req.params.categoryId;
      const changeCategoryName = req.body.changeCategoryName;
      const changeSubcategoryName = req.body.changeSubcategoryName;
      const subcategoryId = req.body.subcategoryId;

      console.log({
        categoryId,
        changeCategoryName,
        changeSubcategoryName,
        subcategoryId
      });

      const changeCat = await categoryService.changeCat({
        categoryId,
        changeCategoryName,
        changeSubcategoryName,
        subcategoryId
      });

      res.status(201).json(changeCat);
    } catch(error) {
      next(error);
    }
  },

  async deleteCat(req, res, next) {
    try{
      const subCatId = req.params.subcategoryId;
      const catId = req.body.categoryId;
      const deleteSubCat = await categoryService.deleteSubCat(subCatId, catId);

      res.status(204).json(deleteSubCat);
    }catch(error){
      next(error);
    }
  }

      res.status(200).json(getAllCat);
    } catch (error) {
      next(error);
    }
  },
};

export { CategoryController };
