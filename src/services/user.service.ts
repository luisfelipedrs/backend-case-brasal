import { User } from '../domain/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError, BadRequestError } from '../application/util/api-error';

const secret: string = process.env.JWT_SECRET || '12345';

export class UserService {

    async login(user: User) {
        const foundUser = await User.findOne({ username: user.username });
            
        if (!foundUser) {
            throw new BadRequestError('Usuário incorreto');
        }

        const isMatch = bcrypt.compareSync(user.password, foundUser.password);

        if (!isMatch) {
            throw new BadRequestError('Senha incorreta');
        }

        const token = jwt.sign({ _id: foundUser._id?.toString(), username: foundUser.username }, secret, {expiresIn: '5 days'});
        return { token: token };
    }

    async register(user: User) {
        const result = await User.create(user);
        return result;
    }
}

export const userService = new UserService();