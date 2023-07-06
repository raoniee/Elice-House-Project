import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  async findByEmail(email) {
    const user = User.findOne({ email });
    return user;
  }

  async create(userInfo) {
    const createUser = await User.create(userInfo);
    return createUser;
  }
}

const userModel = new UserModel();

export { userModel };
