import { Request, Response } from 'express';
import { taskService } from '../../services/task.service';
import { ApiError, BadRequestError } from '../util/api-error';
import { HttpStatus } from '../util/http-code';
import { TaskMapper } from '../mappers/task-map';
import { TaskDTO } from '../dto/in/task-dto';

class TaskController {

    addTask = async (req: Request, res: Response) => {
        const data = {
            description: req.body.description,
            completed: req.body.completed
        }

        if (!data.description) {
            throw new BadRequestError('O campo Descrição deve ser informado');
        }

        if (data.description.length < 3) {
            throw new BadRequestError('O campo Descrição deve possuir 3 caracteres');
        }

        const result = await taskService.createTask(new TaskDTO(data.description, data.completed));

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

    updateTaskStatus = async (req: Request, res: Response) => {
        if (!req.params.id) {
            throw new BadRequestError('O parâmetro id deve ser informado');
        }

        const data = {
            id: req.params.id,
            newDescription: req.body.description as string,
            newCompleted: req.body.completed as boolean
        }

        const result = await taskService.updateTaskStatus(data.id);

        if (result instanceof Error) {
            throw new ApiError(result.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.status(HttpStatus.OK).json(result);
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

        const result = taskService.updateTask(data.id, data.description, data.completed);

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