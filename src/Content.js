import React, { useState, useEffect } from "react";
import "./Content.css";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

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

  const handleDelete = (id) => settodo(todolist.filter((j) => j.id !== id));

  const handleAddTodo = () => {
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
  };

  const handleEdit = (todo) => {
    setTask(todo.task);
    setTime(todo.time);
    setEditId(todo.id);
  };

  const handleClearAll = () => settodo([]);

  const toggleComplete = (id) => {
    const updated = todolist.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    settodo(updated);
  };

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

      <AddTodo
        task={task}
        setTask={setTask}
        time={time}
        setTime={setTime}
        onAddTodo={handleAddTodo}
        editId={editId}
      />

      <TodoList
        todolist={todolist}
        onToggleComplete={toggleComplete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div>
        <button onClick={handleClearAll} className="clear-btn">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Content;
