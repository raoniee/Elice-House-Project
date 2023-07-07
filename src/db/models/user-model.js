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
  async update(userId, toUpdate) {
    

    const updateInfo = await User.findOneAndUpdate({ userId }, toUpdate, {
      returnOriginal: false,
    });
    return updateInfo;
  }
}

const userModel = new UserModel();

export { userModel };
