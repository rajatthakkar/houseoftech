import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  dueDate: Date;
  description: string;
  priority: "low" | "medium" | "high";
  assignTo: string; // userId
  createdBy: string; // user who created task
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    assignTo: { type: String, required: true }, // store userId or email
    createdBy: { type: String, required: true }, // store creator userId
  },
  { timestamps: true }
);

export const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
