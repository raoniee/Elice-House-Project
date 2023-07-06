import { UserService } from "../services/user-service";

const UserController = {
    async createUser(req, res, next) {
        try{
            const { name, email, password } = req.body;
    
        const newUser = UserService.addUser({
            name,
            email,
            password,
        });

        res.status(201).json(newUser);
        } 
        catch(error) {
            throw new Error('회원가입 중 에러 발생')
        }
    }
}


export { UserController }