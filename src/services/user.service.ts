import { User } from '../domain/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secret: string = process.env.JWT_SECRET || '12345';

export class UserService {

    async login(user: User) {
        try {
            const foundUser = await User.findOne({ username: user.username });
            
            if (!foundUser) {
                throw new Error('Usuário incorreto');
            }

            const isMatch = bcrypt.compareSync(user.password, foundUser.password);

            if (isMatch) {
                const token = jwt.sign({ _id: foundUser._id?.toString(), username: foundUser.username }, secret, {expiresIn: '5 days'});
                return { token: token };
            }

            return new Error('Senha incorreta');

        } catch(err) {
            console.log(err);
            return new Error('Não foi possível realizar o login');
        };
    };

    async register(user: User) {
        try {
            const result = await User.create(user);
            return result;

        } catch(err) {
            console.log(err);
            return new Error('Não foi possível cadastrar usuário');
        };
    };
}

export const userService = new UserService();