import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema";

const User = model("users", userSchema);

class UserModel {
    async findByEmail({email}) {
        const email = User.findOne({ email });
        return email;
    } 
}

export { UserModel };