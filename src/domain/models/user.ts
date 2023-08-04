import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const salt = 8;

export interface User {
    _id?: string;
    username: string;
    password: string;
}


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - confirmPassword
 *      properties:
 *        username:
 *          type: string
 *          default: user
 *        password:
 *          type: string
 *          default: stringPassword123
 *        confirmPassword:
 *          type: string
 *          default: stringPassword123
 *    UserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 64c9d11947528957f9b21635
 *        username:
 *          type: string
 *          default: username
 *    UserLoginInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: username
 *        password:
 *          type: string
 *          default: stringPassword123
 *    UserLoggedInResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          default: 
 *        user:
 *          type: object
 *          items:
 *            $ref: '#/components/schemas/UserResponse'
 */
const userSchema: mongoose.Schema<User> = new mongoose.Schema({
        username: { type: String, unique: true },
        password: { type: String }, 
    }, 
    {
    toJSON: {
        transform: (_, ret): void => {
            delete ret.__v;
            delete ret.password;
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

interface UserModel extends Omit<User, '_id'>, Document {};
export const User = mongoose.model<UserModel>('User', userSchema);