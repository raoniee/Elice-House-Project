import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들 라우팅.
viewsRouter.use("/", serveStatic("main"));
viewsRouter.use("/product/list", serveStatic("item-list"));
viewsRouter.use("/product/detail", serveStatic("item-detail"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/admin/main", serveStatic("admin-main"));
viewsRouter.use("/admin/order", serveStatic("admin-order"));
viewsRouter.use("/admin/product", serveStatic("admin-product"));
viewsRouter.use("/admin/category", serveStatic("admin-category"));
viewsRouter.use("/mypage/order", serveStatic("my-order"));
viewsRouter.use("/mypage/info", serveStatic("my-info"));
viewsRouter.use("/order/cart", serveStatic("order-cart"));
viewsRouter.use("/order/progress", serveStatic("order-progress"));
viewsRouter.use("/order/complete", serveStatic("order-complete"));
viewsRouter.use("/apiUtil", serveStatic("apiUtil.js"));

// views 폴더의 최상단 파일 (사진, favicon 등) 라우팅
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/pages/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
