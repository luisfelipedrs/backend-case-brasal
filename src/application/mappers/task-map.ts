import { Task } from "../../domain/models/task";
import { TaskDTO } from "../dto/in/task-dto";

export class TaskMapper {
    public static toDomain(taskDto: TaskDTO) {
        return Task.create(taskDto);
    }

    public static toDTO(task: Task) {
        return new TaskDTO(task.description, task.completed)
    }
}