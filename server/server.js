const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ToDoRoutes = require("./routes/ToDoRoutes")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }, // Completed status
  pomodorosRequired: { type: Number, default: 1 }, // Estimated Pomodoros
  pomodorosCompleted: { type: Number, default: 0 }, // Completed Pomodoros
});

const Todo = mongoose.model("Todo", TodoSchema);

// Routes

app.use("/api", ToDoRoutes);


// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
