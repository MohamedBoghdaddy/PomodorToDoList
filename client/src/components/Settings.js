import React, { useState } from "react";

const SettingsModal = ({ closeModal, saveSettings }) => {
  const [workTime, setWorkTime] = useState(25); // Work Time
  const [breakTime, setBreakTime] = useState(5); // Break Time
  const [longBreakTime, setLongBreakTime] = useState(15); // Long Break

  const handleSave = () => {
    saveSettings({ workTime, breakTime, longBreakTime });
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Pomodoro Settings</h2>
      <label>
        Work Time (minutes):
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
        />
      </label>
      <label>
        Break Time (minutes):
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
        />
      </label>
      <label>
        Long Break Time (minutes):
        <input
          type="number"
          value={longBreakTime}
          onChange={(e) => setLongBreakTime(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default SettingsModal;
