import express from 'express';
import { taskController } from './application/controllers/task.controller';
import { userController } from './application/controllers/user.controller';
import { auth } from './application/middleware/auth';

export const router = express.Router();

router.post('/', auth, taskController.addTask);
router.get('/', auth, taskController.getTasks);
router.put('/:id?', auth, taskController.updateTask);
router.delete('/:id?', auth, taskController.deleteTask);

router.post('/login', userController.login);
router.post('/register', userController.register);