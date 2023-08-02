import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';

dotenv.config();

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = process.env.DB_URL;

const connectionString = `mongodb+srv://${username}:${password}${url}`

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    family: 4
};

export const db = mongoose.connect(connectionString, options)
    .then(res => {
        if (res) {
            console.log('Connected to database');
        }
    }).catch(err => {
        console.log(err);
    });