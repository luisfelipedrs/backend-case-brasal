import { NotFoundError } from "../application/util/api-error";
import { Task } from "../domain/models/task";

export class TaskService {

    async createTask(description: string) {
        const newTask = new Task(description);
        const result = await newTask.save();
        return result;
    }

    async getTasks(description?: string, page?: string) {
        if (description != null) {
            const allTasks = await Task.find();
            const filteredTasks = allTasks.filter(task => task.description.includes(description));
            return filteredTasks;
        }

        const paginationOptions = {
            page: parseInt(page?.trim() || ''),
            limit: 5
        }

        const tasks = await Task.paginate({}, paginationOptions);
        return tasks;
    }

    async updateTask(id?: string, description?: string, completed?: boolean) {
        let task = await Task.findById(id);

            if (!task) {
                throw new NotFoundError('Tarefa não encontrada');
            };

            const filter = { _id: id };
            const update = description != null && completed != null
                ? { description: description }
                : { completed: completed };

            let result = await Task.updateOne(filter, update);
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