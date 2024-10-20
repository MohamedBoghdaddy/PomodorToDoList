import React, { useState, useEffect } from "react";
import axios from "axios";
import "../TodoList.css";
import Analytics from "./Analytics"; // Import the Analytics component

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [pomodorosRequired, setPomodorosRequired] = useState(1);
  const [activeTodoId, setActiveTodoId] = useState(null); // Track active task
  const [time, setTime] = useState(1500); // Timer starts with 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    const newTodo = {
      text,
      pomodorosRequired,
    };
    const response = await axios.post("http://localhost:5000/todos", newTodo);
    setTodos([...todos, response.data]);
    setText("");
    setPomodorosRequired(1);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleCompletion = async (id) => {
    const response = await axios.patch(
      `http://localhost:5000/todos/${id}/toggle`
    );
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            updatePomodoroProgress(activeTodoId);
            setIsBreak(!isBreak);
            setTime(isBreak ? 1500 : 300); // Work: 25 min, Break: 5 min
            setIsRunning(false);
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(interval);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTime(isBreak ? 300 : 1500);
    setIsRunning(false);
  };

  const skipBreak = () => {
    resetTimer();
    setIsBreak(false);
  };

  const nextTask = () => {
    resetTimer();
    const nextIndex = todos.findIndex((todo) => todo._id === activeTodoId) + 1;
    if (nextIndex < todos.length) {
      setActiveTodoId(todos[nextIndex]._id);
    }
  };

  const updatePomodoroProgress = async (id) => {
    const response = await axios.patch(
      `http://localhost:5000/todos/${id}/pomodoro`
    );
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="todo-container">
      <h1 className="title">Pomodoro Todo List</h1>

      {/* Analytics Section */}
      <Analytics todos={todos} />

      {/* Timer */}
      <div className={`pomodoro-timer ${isBreak ? "break" : "work"}`}>
        <h2>{isBreak ? "Break Time!" : "Work Time!"}</h2>
        <p>{formatTime(time)}</p>
        <button onClick={startTimer} disabled={isRunning} className="timer-btn">
          Start
        </button>
        <button onClick={stopTimer} className="timer-btn">
          Stop
        </button>
        <button onClick={resetTimer} className="timer-btn">
          Reset
        </button>
        <button onClick={skipBreak} className="timer-btn">
          Skip Break
        </button>
        <button onClick={nextTask} className="timer-btn">
          Next Task
        </button>
      </div>

      {/* Add Task */}
      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="number"
        className="pomodoro-input"
        value={pomodorosRequired}
        onChange={(e) => setPomodorosRequired(e.target.value)}
        placeholder="Pomodoros required"
        min="1"
      />
      <button className="add-todo-btn" onClick={addTodo}>
        Add Todo
      </button>

      {/* Task List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span onClick={() => toggleCompletion(todo._id)}>{todo.text}</span>
            <div className="pomodoro-progress">
              Pomodoros: {todo.pomodorosCompleted}/{todo.pomodorosRequired}
            </div>
            <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
              Delete
            </button>
            <button
              onClick={() => setActiveTodoId(todo._id)}
              className="start-btn"
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
