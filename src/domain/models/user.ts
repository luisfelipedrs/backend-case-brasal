import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const salt = 8;

export interface User {
    _id?: string;
    username: string;
    password: string;
};

const userSchema: mongoose.Schema<User> = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

interface UserModel extends Omit<User, '_id'>, Document {};
export const User = mongoose.model<UserModel>('User', userSchema);