import { productService } from "../services/product-service.js";

const ProductController = {
  // 전체 상품 조회 (admin)
  async getAllProducts(req, res, next) {
    // response: name, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
      const getAllProductInfo = await productService.getAllProductInfo();

      res.status(200).json(getAllProductInfo);
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가(admin)
  async createProduct(req, res, next) {
    // categoryName, subcategoryName, name, price, imageUrl ,brand, description
    try {
      const categoryName = req.body.categoryName;
      const subcategoryName = req.body.subcategoryName;
      const name = req.body.name;
      const price = req.body.price;
      const imageUrl = req.body.imageUrl;
      const brand = req.body.brand;
      const description = req.body.description;

      const newProduct = await productService.addProduct({
        categoryName,
        subcategoryName,
        name,
        price,
        imageUrl,
        brand,
        description,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  // 상품 삭제(admin)
  async deleteProduct(req, res, next) {
    // productId
    try {
    } catch (error) {
      next(error);
    }
  },

  // 상품 정보 카테고리별 조회(user)
  async getProductsByCat(req, res, next) {
    // subcategoryId
    try {
    } catch (error) {
      next(error);
    }
  },

  // 상품 정보 상세 조회(user)
  async getProductsById(req, res, next) {
    // response: productId, name, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
    } catch (error) {
      next(error);
    }
  },
};

export { ProductController };
