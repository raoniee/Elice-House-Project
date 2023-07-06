import { User } from "../db/models/user-model";

const UserService = {

    async addUser(userInfo) {
        const name = userInfo.name;
        const email = userInfo.email;
        const password = userInfo.password;

        
    },
}

export { UserService }