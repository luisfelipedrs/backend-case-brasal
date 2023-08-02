import mongoose, { Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Task {
    _id?: string;
    description: string;
    completed: boolean;
}

const taskSchema = new mongoose.Schema({
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                delete ret.__v;
            }
        },

        timestamps: true
    }
)

taskSchema.plugin(paginate);

interface TaskModel extends Omit<Task, '_id'>, Document {};
export const Task = mongoose.model<TaskModel, mongoose.PaginateModel<TaskModel>>('Tasks', taskSchema, 'tasks');