import { Request, Response } from "express";
import { z } from "zod";
import { getAllTasks, createTask, updateTask, deleteTask } from "../models/taskModel";

const taskSchema = z.object({
  title: z.string().min(1),
  color: z.string().min(1),
});

export const getTasks = async (req: Request, res: Response) => {
  try {
  const tasks = await getAllTasks();
  res.status(200).json(tasks);
} catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "Unknown error occurred" });
  }
}
};


export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, color } = taskSchema.parse(req.body);
    const task = await createTask(title, color);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const data = req.body;
    const task = await updateTask(id, data);
    res.status(200).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
};


export const removeTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    await deleteTask(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
};
