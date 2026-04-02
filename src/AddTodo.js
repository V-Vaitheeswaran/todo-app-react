import React from "react";

const AddTodo = ({ task, setTask, time, setTime, onAddTodo, editId }) => {
  return (
    <div className="add-section">
      <input
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        placeholder="Time"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={onAddTodo}>{editId ? "Update" : "➕"}</button>
    </div>
  );
};

export default AddTodo;
