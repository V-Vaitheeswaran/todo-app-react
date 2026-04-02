import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todolist, onToggleComplete, onEdit, onDelete }) => {
  return (
    <>
      <div className="row header">
        <span>#</span>
        <span>Task</span>
        <span>Time</span>
        <span>Actions</span>
      </div>

      {todolist.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          index={index}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default TodoList;
