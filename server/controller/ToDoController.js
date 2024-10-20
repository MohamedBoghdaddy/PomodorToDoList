const Todo = require("../models/ToDoModel");

// Get all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    pomodorosRequired: req.body.pomodorosRequired,
    pomodorosCompleted: 0,
  });
  await newTodo.save();
  res.json(newTodo);
};

// Update a todo's pomodoro progress
exports.updatePomodoroProgress = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.pomodorosCompleted = Math.min(
    todo.pomodorosCompleted + 1,
    todo.pomodorosRequired
  );
  await todo.save();
  res.json(todo);
};

// Toggle completion
exports.toggleCompletion = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
