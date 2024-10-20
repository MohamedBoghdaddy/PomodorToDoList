import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// PomodoroChart Component
const PomodoroChart = ({ todos }) => {
  const data = {
    labels: todos.map((todo) => todo.text),
    datasets: [
      {
        label: "Pomodoros Completed",
        data: todos.map((todo) => todo.pomodorosCompleted),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Pomodoro Progress</h2>
      <Bar data={data} />
    </div>
  );
};

// Analytics Component with Toggle
const Analytics = ({ todos }) => {
  const [showAnalytics, setShowAnalytics] = useState(false); // Track visibility

  const totalPomodorosCompleted = todos.reduce(
    (sum, todo) => sum + todo.pomodorosCompleted,
    0
  );

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics); // Toggle visibility
  };

  return (
    <div className="analytics-form">
      {/* Button to toggle the form */}
      <button className="analytics-toggle-btn" onClick={toggleAnalytics}>
        {showAnalytics ? "Hide Analytics" : "Show Analytics"}
      </button>

      {/* Show analytics only if the button is pressed */}
      {showAnalytics && (
        <div className="analytics-container">
          <h2>Analytics</h2>
          <p>Total Pomodoros Completed: {totalPomodorosCompleted}</p>
          {/* Chart displaying the pomodoros completed for each task */}
          <PomodoroChart todos={todos} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
