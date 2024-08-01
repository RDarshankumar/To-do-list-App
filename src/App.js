



import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedInProgress = JSON.parse(localStorage.getItem('tasksInProgress')) || [];
    const savedCompleted = JSON.parse(localStorage.getItem('completedTasks')) || [];

    setTasks(savedTasks);
    setTasksInProgress(savedInProgress);
    setCompletedTasks(savedCompleted);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, tasksInProgress, completedTasks]);

  const addTask = (task) => {
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), text: task };
      setTasks([...tasks, newTask]);
      setTasksInProgress([...tasksInProgress, newTask]);
    }
  };

  const moveToCompleted = (task) => {
    setCompletedTasks([...completedTasks, task]);
    setTasksInProgress(tasksInProgress.filter((t) => t.id !== task.id));
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-columns">
        <div className="column tasks">
          <h2>Tasks</h2>
          <input
            type="text"
            placeholder="Add new task"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                {task.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="column in-progress">
          <h2>In Progress</h2>
          <ul>
            {tasksInProgress.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.text}</span>
                <button className="complete-btn" onClick={() => moveToCompleted(task)}>
                  Complete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="column completed">
          <h2>Completed</h2>
          <button className="clear-btn" onClick={clearCompletedTasks}>
            Clear Completed Tasks
          </button>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id} className="task-item completed-task">
                {task.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

