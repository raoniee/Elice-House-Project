import { UserModel } from "../db/models/user-model";
import bcrypt from 'bcrypt'

class UserService {
    async addUser(userRegist) {
        const name = userRegist.name;
        const email = userRegist.email;
        const password = userRegist.password;

        // 이메일 중복 확인 
        const user = await UserModel.findByEmail({ email }); 
        if (user) {
            throw new Error('이미 존재된 아이디입니다.')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const UserInfo = { name, email, password: hashedPassword }
        const addNewUser  = await UserModel.create(UserInfo);

        return addNewUser;
    }
}

export { UserService }