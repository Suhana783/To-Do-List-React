import React, { useState, useRef } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  function addTask() {
    const value = inputRef.current.value.trim();
    if (value === "") return;
    setTasks([...tasks, { text: value, done: false }]);
    inputRef.current.value = "";
  }

  function toggleTask(index) {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <p>Keep track of your tasks</p>

      <div className="input-wrapper">
        <input type="text" placeholder="Add a new task..." ref={inputRef} />
        <div className="add-btn" onClick={addTask}>+</div>
      </div>

      <div className="task-box">
        <div className="task-summary">
          <span>{tasks.filter(t => !t.done).length} active</span>
          <span>•</span>
          <span>{tasks.filter(t => t.done).length} completed</span>

          {tasks.some(t => t.done) && (
            <span
              className="clear-completed"
              onClick={() => setTasks(tasks.filter(t => !t.done))}
            >
              Clear completed
            </span>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="empty-text">No tasks yet. Add one above to get started!</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className={task.done ? "completed" : ""}>
                <span className="task-text">{task.text}</span>
                <div className="actions">
                  <span onClick={() => toggleTask(index)}>✔️</span>
                  <span onClick={() => deleteTask(index)}>🗑️</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todo;
