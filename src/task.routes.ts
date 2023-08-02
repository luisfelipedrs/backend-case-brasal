import express from 'express';
import { taskController } from './application/controllers/task.controller';

export const router = express.Router();

router.post('/', taskController.addTask);
router.get('/', taskController.getTasks);
router.put('/:id?', taskController.updateTask);
router.delete('/:id?', taskController.deleteTask);