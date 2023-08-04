import supertest from 'supertest';
import createServer from '../application/util/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { taskService } from '../services/task.service';
import { userService } from '../services/user.service';

const app = createServer();

describe('routes', () => {

    const userRequestPayload = {
        "username": "luisfelipesupertest",
        "password": "12345",
        "confirmPassword": "12345"
    }

    const userLoginPayload = {
        "username": "luisfelipesupertest",
        "password": "12345",
    }

    const taskRequestPayload = {
        "description": "task 1",
        "completed": false
    }

    const taskResponsePayload = {
        "description": "task 1",
        "completed": false,
        "_id": "64cb7a71f60b6511735b0076",
        "createdAt": "2023-08-03T09:59:13.899Z",
        "updatedAt": "2023-08-03T09:59:13.899Z"
    }

    let token = '';

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get task route', () => {
        describe('given no tasks exist', () => {
            it('should return a 200', async () => {
                const { body, statusCode } = await supertest(app).get(`/api/v1/tasks`);
                expect(statusCode).toBe(200);
                expect(body.docs.length).toBe(0);
            })
        })

        describe('given a task does exist', () => {
            it('should return a 200', async () => {
                const task = await taskService.createTask(taskRequestPayload);
                const { body, statusCode } = await supertest(app).get(`/api/v1/tasks`);
                expect(statusCode).toBe(200);
                expect(body.docs.length).toBe(1);
            })
        })
    })

    describe('register route', () => {
        describe('given the user registers', () => {
            it('should create a user name and password', async () => {
                const { body, statusCode } = await supertest(app).post(`/api/v1/register`)
                .send(userRequestPayload);

                expect(statusCode).toBe(201);
                expect(body.message).toBe('Usuário cadastrado com sucesso!');
            })
        })
    })

    describe('login route', () => {
        describe('given the user logs in', () => {
            it('should return a token', async () => {
                const { body, statusCode } = await supertest(app).post(`/api/v1/login`)
                .send(userLoginPayload);

                token = body.token;

                expect(statusCode).toBe(200);
            })
        })
    })

    describe('create task route', () => {
        describe('given the user is not authenticated', () => {
            it('should return a 401', async () => {
                const { statusCode } = await supertest(app).post(`/api/v1/tasks`);
                expect(statusCode).toBe(401);
            })
        })

        describe('given the user is logged in', () => {
            it('should return a 201 and create the task', async () => {
                const { statusCode, body } = await supertest(app)
                .post(`/api/v1/tasks`)
                .set('Authorization', `Bearer ${token}`)
                .send(taskRequestPayload);

                expect(statusCode).toBe(201);
                expect(body).toEqual({
                    "description": "task 1",
                    "completed": false,
                    "_id": expect.any(String),
                    "createdAt": expect.any(String),
                    "updatedAt": expect.any(String)
                })
            })
        })
    })

    describe('delete task route', () => {
        describe('given the user is not authenticated', () => {
            it('should return a 401', async () => {
                const { statusCode } = await supertest(app).delete(`/api/v1/tasks/64cb7a71f60b6511735b0076`);
                expect(statusCode).toBe(401);
            })
        })
    })

    describe('put task route', () => {
        describe('given the user is not authenticated', () => {
            it('should return a 401', async () => {
                const { statusCode } = await supertest(app).put(`/api/v1/tasks/64cb7a71f60b6511735b0076`);
                expect(statusCode).toBe(401);
            })
        })
    })

    describe('patch task route', () => {
        describe('given the user is not authenticated', () => {
            it('should return a 401', async () => {
                const { statusCode } = await supertest(app).put(`/api/v1/tasks/64cb7a71f60b6511735b0076`);
                expect(statusCode).toBe(401);
            })
        })
    })
})