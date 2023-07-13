import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { ifAdminAllow } from "../middlewares/admin-middleware.js";
import { checkLogin } from "../middlewares/login-middleware.js";
const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.createUser);
// 로그인
userRouter.post("/login", UserController.login);

// 사용자 정보 조회
userRouter.get("/users", checkLogin, UserController.getInfo);
// 사용자 정보 수정
userRouter.patch("/users", checkLogin, UserController.updateUser);
// 사용자 정보 삭제(회원 탈퇴)
userRouter.delete("/users", checkLogin, UserController.deleteUser);
// checkLogin,
// 사용자 비밀번호 확인
userRouter.post("/user/password/check/:userId", UserController.checkPassword);

//관리자 모드
//모든 회원정보 조회
userRouter.get("/admin/users", UserController.getAllUser);

export { userRouter };
