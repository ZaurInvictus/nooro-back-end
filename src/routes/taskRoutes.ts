import { Router } from "express";
import { getTasks, addTask, editTask, removeTask } from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", editTask);
router.delete("/tasks/:id", removeTask);

export default router;
