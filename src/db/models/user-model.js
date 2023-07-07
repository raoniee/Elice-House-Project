import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  // 이메일로 유저 찾기 
  async findByEmail(email) {
    const user = await User.findOne(email);
    return user;
  }
  //DB 생성
  async create(userInfo) {
    const createUser = await User.create(userInfo);
    return createUser;
  }
  //userID로 유저 찾기
  async findByUserId(userId) {
    const user = await User.findById(userId);
    return user;
  }
  //userID로 유저 삭제
  async deleteByUserId(userId) {
    const deleteUser = await User.deleteOne(userId);
    return deleteUser;
  }
  //모든 User 정보 가져오기
  async findAll() {
    const allUser = await User.find({});
    return allUser;
  }

  // name 수정 
  async updateName(updateInfo) {
    const userId = updateInfo.userId;
    const name = updateInfo.name;
    const checkUpdateName = await User.findByIdAndUpdate(userId, { name });
    return checkUpdateName;
  }

  // password 수정 
  async updatePassword(updateInfo) {
    const userId = updateInfo.userId;
    const password = updateInfo.hashedPassword;
    const checkUpdatePassword = await User.findByIdAndUpdate(userId, {
      password,
    });
    return checkUpdatePassword;
  }

}

const userModel = new UserModel();

export { userModel };
