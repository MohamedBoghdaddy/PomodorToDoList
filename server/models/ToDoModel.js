const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }, // Track if task is completed
  pomodorosRequired: { type: Number, default: 1 }, // Estimated Pomodoros
  pomodorosCompleted: { type: Number, default: 0 }, // Completed Pomodoros
});

module.exports = mongoose.model("Todo", TodoSchema);
