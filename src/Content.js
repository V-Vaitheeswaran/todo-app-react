import React, { useState, useEffect } from "react";
import "./Content.css";

const initialTodos = [
  { id: 1, task: "Learn React", time: 9, completed: false },
  { id: 2, task: "Revise HTML/CSS", time: 10, completed: false },
  { id: 3, task: "Practice React", time: 11, completed: false },
];

const Content = () => {
  const [todolist, settodo] = useState(() => {
    try {
      const saved = localStorage.getItem("todo_list");
      return saved ? JSON.parse(saved) : initialTodos;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return initialTodos;
    }
  });

  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);

  function handleDelete(id) {
    settodo(todolist.filter((j) => j.id !== id));
  }

  function handleAddTodo() {
    if (task.trim() === "" || !time) return;

    if (editId) {
      const updated = todolist.map((t) =>
        t.id === editId ? { ...t, task, time: Number(time) } : t,
      );
      settodo(updated);
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        task,
        time: Number(time),
        completed: false,
      };
      settodo([...todolist, newTodo]);
    }

    setTask("");
    setTime("");
  }

  function handleEdit(todo) {
    setTask(todo.task);
    setTime(todo.time);
    setEditId(todo.id);
  }

  function handleClearAll() {
    settodo([]);
  }

  function toggleComplete(id) {
    const updated = todolist.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    settodo(updated);
  }

  useEffect(() => {
    try {
      localStorage.setItem("todo_list", JSON.stringify(todolist));
    } catch (error) {
      console.warn("Error writing localStorage", error);
    }
  }, [todolist]);

  return (
    <div className="container">
      <h2 className="title">Todo List</h2>

      {/* Add / Edit */}
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
        <button onClick={handleAddTodo}>{editId ? "Update" : "➕"}</button>
      </div>

      {/* Header */}
      <div className="row header">
        <span>#</span>
        <span>Task</span>
        <span>Time</span>
        <span>Actions</span>
      </div>

      {/* List */}
      {todolist.map((todo, index) => (
        <div className="row" key={todo.id}>
          <span>{index + 1}</span>

          <span
            onClick={() => toggleComplete(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.task}
          </span>

          <span>{todo.time}</span>

          <div>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}

      <div>
        <button onClick={handleClearAll} className="clear-btn">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Content;
