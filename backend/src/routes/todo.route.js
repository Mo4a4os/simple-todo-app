import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteTodo,
  getTodos,
  sendTodo,
  updateTodoCategory,
  updateTodoDone,
  updateTodoText,
} from "../controllers/todo.controller.js";
const router = express.Router();

router.get("/", protectRoute, getTodos);
router.post("/send", protectRoute, sendTodo);
router.delete("/delete/:id", protectRoute, deleteTodo);
router.patch("/category/:id", protectRoute, updateTodoCategory);
router.patch("/text/:id", protectRoute, updateTodoText);
router.patch("/done/:id", protectRoute, updateTodoDone);
export default router;
