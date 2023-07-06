import { userService } from "../services/user-service.js";

const UserController = {
  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.addUser({
        name,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
      // throw new Error("회원가입 중 에러 발생");
    }
  },

  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      console.log(req.body);

      // 이메일 패스워드 일치 여부 확인 및 JWT 토큰 생성
      const checkUser = await userService.giveToken({ email, password });

      console.log(checkUser);

      res.status(201).json(checkUser);
    } catch (error) {
      next(error);
    }
  },
};

export { UserController };
