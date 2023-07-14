import { productService } from "../services/product-service.js";

const ProductController = {
  // 전체 상품 조회 (admin)
  async getAllProducts(req, res, next) {
    // response: productName, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
      const AllProductInfo = await productService.getAllProductInfo();

      res.status(200).json(AllProductInfo);
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가(admin)
  async createProduct(req, res, next) {
    // categoryName, subcategoryName, productName, price ,brand, description
    try {
      const {
        categoryName,
        subcategoryName,
        productName,
        price,
        brand,
        description,
      } = req.body;

      // console.log(req.image);
      // const imageUrl = req.image.filename;

      const imageUrl = req.file.path.substr(15);
      console.log(imageUrl);

      const newProduct = await productService.addProduct({
        categoryName,
        subcategoryName,
        productName,
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
    // response: productId, productName, brand, price, subcategoryId, imageUrl, description, soldQuantity
    try {
      const productId = req.params.productId;
      const productInfo = await productService.getProdById(productId);
      res.status(200).json(productInfo);
    } catch (error) {
      next(error);
    }
  },

  // 상품 정보 수정(admin)
  async updateProduct(req, res, next) {
    // path params: productId
    // body params: categoryName, subcategoryName, productName, brand, price, imageUrl, description, saleStatus

    const productId = req.params.productId;
    const {
      categoryName,
      subcategoryName,
      productName,
      brand,
      price,
      description,
      saleStatus,
    } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path.substr(15);
      console.log(imageUrl);
    }

    const toUpdate = {
      ...(categoryName && { categoryName }),
      ...(subcategoryName && { subcategoryName }),
      ...(productName && { productName }),
      ...(brand && { brand }),
      ...(price && { price }),
      ...(imageUrl && { imageUrl }),
      ...(description && { description }),
      ...(saleStatus && { saleStatus }),
    };

    const checkUpdate = await productService.updateInfo(productId, toUpdate);

    try {
      res.status(200).json(checkUpdate);
    } catch (error) {
      next(error);
    }
  },
};

export { ProductController };
