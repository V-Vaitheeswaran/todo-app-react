import React from "react";

const TodoItem = ({ todo, index, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div className="row" key={todo.id}>
      <span>{index + 1}</span>

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#f1f1f1",
        }}
      >
        {todo.task}
      </span>

      <span>{todo.time}</span>

      <div>
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={todo.completed ? "completed-btn" : "mark-complete-btn"}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEdit(todo)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
