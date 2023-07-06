import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.createUser);
// 로그인
userRouter.post("/login", UserController.login);

// 사용자 정보 조회
userRouter.get("/users/:userid", async (req, res, next) => {});
// 사용자 정보 수정
userRouter.patch("/users/:userid", async (req, res, next) => {});
// 사용자 정보 추가
userRouter.post("/users", async (req, res, next) => {});
// 사용자 정보 삭제(회원 탈퇴)
userRouter.delete("/users/:userid", async (req, res, next) => {});

export { userRouter };
