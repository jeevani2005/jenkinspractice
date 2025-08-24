import React, { useState } from "react";
import "./style.css"; 

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

 
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>To-Do List 📋</h1>

        {/* Input for new task */}
        <div className="input-box">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add your task"
          />
          <button onClick={addTask}>ADD</button>
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="task-buttons">
                    <button
                      className="update-btn"
                      onClick={() => saveEdit(task.id)}
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span onClick={() => toggleComplete(task.id)}>
                    {task.text}
                  </span>
                  <div className="task-buttons">
                    <button
                      className="update-btn"
                      onClick={() => startEditing(task.id, task.text)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
