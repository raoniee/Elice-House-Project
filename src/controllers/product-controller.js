import { productService } from "../services/product-service.js";

const ProductController = {
  // 전체 상품 조회 (admin)
  async getAllProducts(req, res, next) {
    // response: name, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
      const AllProductInfo = await productService.getAllProductInfo();

      res.status(200).json(AllProductInfo);
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가(admin)
  async createProduct(req, res, next) {
    // categoryName, subcategoryName, name, price, imageUrl ,brand, description
    try {
      const {
        categoryName,
        subcategoryName,
        name,
        price,
        imageUrl,
        brand,
        description,
      } = req.body;

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
      const productId = req.params.productId;

      const deleteProductInfo = await productService.deleteById(productId);

      res.status(200).json(deleteProductInfo);
    } catch (error) {
      next(error);
    }
  },

  // 상품 정보 카테고리별 조회(user)
  async getProductsByCat(req, res, next) {
    // subcategoryId
    try {
      const subcatId = req.params.subcatId;
      const subcatProducts = await productService.getSubcatProdsById(subcatId);
      res.status(200).json(subcatProducts);
    } catch (error) {
      next(error);
    }
  },

  // 상품 정보 상세 조회(user)
  async getProdById(req, res, next) {
    // request : productId
    // response: productId, name, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
      const productId = req.params.productId;
      const productInfo = await productService.getProdById(productId);
      res.status(200).json(productInfo);
    } catch (error) {
      next(error);
    }
  },
};

export { ProductController };
