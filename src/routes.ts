import 'express-async-errors';
import express from 'express';
import { taskController } from './application/controllers/task.controller';
import { userController } from './application/controllers/user.controller';
import { auth } from './application/middleware/auth';

export const router = express.Router();

/**
 * @openapi
 * /api/v1/tasks:
 *  get:
 *     tags:
 *     - Tasks
 *     description: Retorna todas as tarefas registradas
 *     responses:
 *       200:
 *         description: Request ok
 *       401:
 *         description: Unauthorized
 */
router.get('/tasks', taskController.getTasks);

/**
 * @openapi
 * '/api/v1/tasks':
 *  post:
 *     tags:
 *     - Tasks
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTaskResponse'
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 */
router.post('/tasks', auth, taskController.addTask);

/**
 * @openapi
 * /api/v1/tasks/{taskId}:
 *  patch:
 *     tags:
 *     - Tasks
 *     description: Atualiza o status de uma tarefa
 *     responses:
 *       200:
 *         description: Request ok
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch('/tasks/:id?', auth, taskController.updateTaskStatus);

/**
 * @openapi
 * '/api/v1/tasks/{taskId}':
 *  put:
 *     tags:
 *     - Tasks
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *      200:
 *        description: Request ok
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 */
router.put('/tasks/:id', auth, taskController.updateTask);

/**
 * @openapi
 * /api/v1/tasks/{taskId}:
 *  delete:
 *     tags:
 *     - Tasks
 *     description: Deleta uma tarefa
 *     responses:
 *       204:
 *         description: Request ok
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/tasks/:id?', auth, taskController.deleteTask);


/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *     tags:
 *     - Users
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *      201:
 *        description: Request Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLoggedInResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
router.post('/login', userController.login);

/**
 * @openapi
 * '/api/v1/register':
 *  post:
 *     tags:
 *     - Users
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad request
 */
router.post('/register', userController.register);