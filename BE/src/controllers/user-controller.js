import { UserService } from "../services/user-service";

const UserController = {
    async createUser(req, res, next) {
        const { name, email, password } = req.body;
    
        const newUser = UserService.addUser({
            name,
            email,
            password,
        });
    }
}


export { UserController }