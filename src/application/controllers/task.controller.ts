import { Request, Response } from 'express';
import { taskService } from '../../services/task.service';
import { ApiError, BadRequestError } from '../util/api-error';
import { HttpStatus } from '../util/http-code';

class TaskController {

    addTask = async (req: Request, res: Response) => {
        if (!req.body.description) {
            throw new BadRequestError('O campo Descrição deve ser informado');
        }

        if (req.body.description.length < 3) {
            throw new BadRequestError('O campo Descrição deve possuir 3 caracteres');
        }

        const result = await taskService.createTask(req.body.description);

        if (result instanceof Error) {
            throw new ApiError(result.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.status(HttpStatus.CREATED).json(result);
    }

    getTasks = async (req: Request, res: Response) => {
        const { description, page } = req.query;
        const result = await taskService.getTasks(description as string, page as string);
        res.status(HttpStatus.OK).json(result);
    }

    updateTask = async (req: Request, res: Response) => {
        if (!req.params.id) {
            throw new BadRequestError('O parâmetro id deve ser informado');
        }

        const data = {
            id: req.params.id,
            description: req.body.description as string,
            completed: req.body.completed as boolean
        }

        const result = await taskService.updateTask(data.id, data.description, data.completed);

        if (result instanceof Error) {
            throw new ApiError(result.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.status(HttpStatus.OK).json(result);
    }

    deleteTask = async (req: Request, res: Response) => {
        if (!req.params.id) {
            throw new BadRequestError('O parâmetro id deve ser informado');
        }

        const id = req.params.id;
        const result = await taskService.deleteTask(id);

        if (result instanceof ApiError) {
            throw new ApiError(result.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.status(HttpStatus.NO_CONTENT).send();
    }
}

export const taskController = new TaskController();