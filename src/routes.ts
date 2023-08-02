import 'express-async-errors';
import express from 'express';
import { taskController } from './application/controllers/task.controller';
import { userController } from './application/controllers/user.controller';
import { auth } from './application/middleware/auth';

export const router = express.Router();

router.post('/tasks', auth, taskController.addTask);
router.get('/tasks', auth, taskController.getTasks);
router.put('/tasks/:id?', auth, taskController.updateTask);
router.delete('/tasks/:id?', auth, taskController.deleteTask);

router.post('/login', userController.login);
router.post('/register', userController.register);