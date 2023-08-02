import { Request, Response } from 'express';
import { taskService } from '../../services/task.service';

class TaskController {

    addTask = async (req: Request, res: Response) => {
        if (!req.body.description) {
            return res.status(400).json({ 
                error: 'O campo Descrição deve ser informado'
            });
        };

        if (req.body.description.length < 3) {
            return res.status(400).json({ 
                error: 'O campo Descrição deve possuir no minimo 3 caracteres'
            });
        };

        const data = {
            description: req.body.description
        };

        const result = await taskService.createTask(data.description);

        if (result instanceof Error) {
            return res.status(500).json({
                error: result.message
            });
        };

        return res.status(201).json(result);
    };

    getTasks = async (req: Request, res: Response) => {
        const { description, page } = req.query;
        const result = await taskService.getTasks(description as string, page as string);
        res.status(200).send(result);
    };

    updateTask = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ 
                error: 'O parâmetro id deve ser informado'
            });
        };

        const data = {
            id: req.params.id,
            description: req.body.description as string,
            completed: req.body.completed as boolean
        };

        const result = await taskService.updateTask(data.id, data.description, data.completed);

        if (result instanceof Error) {
            return res.status(404).json({
                error: result.message
            });
        };

        return res.status(200).json(result);
    };

    deleteTask = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ 
                error: 'O parâmetro id deve ser informado'
            });
        };

        const id = req.params.id;
        const result = await taskService.deleteTask(id);

        if (result instanceof Error) {
            return res.status(404).json({
                error: result.message
            });
        };

        return res.status(204).send();
    };
}

export const taskController = new TaskController();