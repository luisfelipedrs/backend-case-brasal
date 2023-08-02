import { Task } from "../domain/models/task";

export class TaskService {
    
    async createTask(description: string) {
        try {
            const newTask = new Task(description);
            const result = await newTask.save();
            return result;

        } catch(err) {
            console.log(err) 
            return new Error('Erro ao registrar tarefa');
        };
    };

    async getTasks(description?: string, page?: string) {
        try {
            if (description != null) {
                const allTasks = await Task.find();
                const filteredTasks = allTasks.filter(task => task.description.includes(description));
                return filteredTasks;
            };

            const paginationOptions = {
                page: parseInt(page?.trim() || ''),
                limit: 5
            };

            const tasks = await Task.paginate({}, paginationOptions);
            return tasks;

        } catch(err) {
            console.log(err);
            return new Error('Não foi possível carregar tarefas');
        };
    };

    async updateTask(id?: string, description?: string, completed?: boolean) {
        try {
            let task = await Task.findById(id);

            if (!task) {
                return new Error('Tarefa não encontrada');
            };

            const filter = { _id: id };
            const update = description != null && completed != null
                ? { description: description }
                : { completed: completed };

            let result = await Task.updateOne(filter, update);
            return result;

        } catch(err) {
            console.log(err);
            return new Error('Erro ao atualizar tarefa');
        };
    };

    async deleteTask(id: string) {
        try {
            const task = await Task.findByIdAndDelete(id);

            if (!task) {
                return new Error('Tarefa não encontrada');
            };

        } catch(err) {
            console.log(err);
            return new Error('Erro ao deletar tarefa');
        };
    };
}

export const taskService = new TaskService();