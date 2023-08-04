import { NotFoundError } from "../application/util/api-error";
import { Task } from "../domain/models/task";

export class TaskService {

    async createTask(task: Task) {
        const newTask = await Task.create(task);
        return newTask;
    }

    async getTasks(description?: string, page?: string) {
        const paginationOptions = {
            page: parseInt(page?.trim() || '1'),
            limit: 10,
        }

        if (description != null) {
            const filter = { description: description };
            const filteredTasks = await Task.paginate(filter, paginationOptions);
            return filteredTasks;
        }

        const tasks = await Task.paginate({}, paginationOptions);
        return tasks;
    }

    async updateTaskStatus(id: string) {
        let task = await Task.findById(id);

        if (!task) {
            throw new NotFoundError('Tarefa não encontrada');
        }

        const filter = { _id: task.id };

        let result = await Task.findOneAndUpdate(filter, { $set: { completed: !task.completed }});
        return result;
    }

    async updateTask(id:string, description: string, completed: boolean) {
        let task = await Task.findById(id);

        if (!task) {
            throw new NotFoundError('Tarefa não encontrada');
        }

        const filter = { _id: task._id };

        let result = await Task.findOneAndUpdate(filter, { $set: { description: description, completed: completed }});
        return result;
    }

    async deleteTask(id: string) {
        const task = await Task.findById(id);

        if (!task) {
            throw new NotFoundError('Tarefa não encontrada');
        }

        let result = await Task.deleteOne({ _id: task._id });
        return result;
    }
}

export const taskService = new TaskService();