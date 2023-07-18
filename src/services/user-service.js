import { userModel } from "../db/models/user-model.js";
import { orderModel } from "../db/models/order-model.js";
import { orderitemModel } from "../db/models/orderitem-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { error } from "console";
import moment from "moment-timezone";

class UserService {
  async addUser(userRegist) {
    const name = userRegist.name;
    const email = userRegist.email;
    const password = userRegist.password;

    // 이메일 중복 확인
    const user = await userModel.findByEmail({ email });
    if (user) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const UserInfo = { name, email, password: hashedPassword };
    const addNewUser = await userModel.create(UserInfo);

    // 로컬 Date 업데이트
    const postDate = moment.tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss");
    await userModel.update(addNewUser._id, { date: postDate });

    return addNewUser;
  }

  // 로그인 아이디 비밀번호 확인 및 jwt 토큰 생성
  async giveToken(userIdPass) {
    const { email, password, isAdmin } = userIdPass;

    const user = await userModel.findByEmail({ email });

    if (!user) {
      throw new Error("아이디 확인 필요");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("비밀번호 확인 필요");
    }

    const key = process.env.KEY;
    const token = jwt.sign(
      { email, userId: user._id, isAdmin: user.isAdmin },
      key
    );
    const isAdminValue = user.isAdmin;

    return { token, isAdminValue };
  }

  // UserId를 통해 DB에서 user객체를 찾고 삭제.
  async deleteById(userId) {
    const deleteData = await userModel.deleteByUserId(userId);

    const orders = await orderModel.findByUserId(userId);
    const deleteOrder = await orderModel.deleteByOrderIdMany(userId);

    for (const order of orders) {
      const ordId = order._id;
      const deleteOrderItem = await orderitemModel.deleteByOrderId(ordId);
    }

    const deleteCount = deleteData.deletedCount;
    if (deleteCount === 0) {
      throw new Error("userId에 해당하는 User정보가 없습니다.");
    }

    return { result: "Deleted Data" };
  }

  // 사용자 정보 수정
  async updateInfo(userId, toUpdate) {
    const password = toUpdate.password;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      toUpdate.password = hashedPassword;
    }

    const checkUpdate = await userModel.update(userId, toUpdate);

    return checkUpdate;
  }

  // 사용자가 User 정보 조회
  async getAllUserInfo(userId) {
    const allUserInfo = await userModel.findAll();

    return allUserInfo;
  }

  async findByUserId(userId) {
    const userInfo = await userModel.findByUserId(userId);

    return userInfo;
  }

  async checkPassword(userId, passowrd) {
    const userInfo = await userModel.findByUserId(userId);

    const hashedPassword = userInfo.password;
    const checkPassword = await bcrypt.compare(passowrd, hashedPassword);

    if (!checkPassword) {
      throw new Error("비밀번호 확인 필요");
    }

    return true;
  }
}

const userService = new UserService();

export { userService };
