const express = require("express");
const router = express.Router();
const todoController = require("../controller/ToDoController");

router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.addTodo);
router.patch("/todos/:id/pomodoro", todoController.updatePomodoroProgress);
router.patch("/todos/:id/toggle", todoController.toggleCompletion);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
