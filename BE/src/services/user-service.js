import { userModel } from "../db/models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

class UserService {
  async addUser(userRegist) {
    const name = userRegist.name;
    const email = userRegist.email;
    const password = userRegist.password;

    // 이메일 중복 확인
    const user = await userModel.findByEmail(email);
    if (user) {
      throw new Error("이미 존재된 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const UserInfo = { name, email, password: hashedPassword };
    const addNewUser = await userModel.create(UserInfo);

    return addNewUser;
  }

  async giveToken(userIdPass) {
    const email = userIdPass.email;
    const password = userIdPass.password;

    const user = await userModel.findByEmail(email);

    if (!user) {
      throw new Error("아이디 확인 필요");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("비밀번호 확인 필요");
    }

    const key = process.env.KEY;
    const token = jwt.sign({ email, userId: user._id }, key);

    return { token, isAdmin: user.isAdmin };
  }
}

const userService = new UserService();

export { userService };
