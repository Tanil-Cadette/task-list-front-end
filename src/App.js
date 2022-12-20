import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: true,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Laundry',
    isComplete: false,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const toggleComplete = (taskId) => {
    const newTaskData = [...taskData];
    for (const task of newTaskData) {
      if (task.id == taskId) {
        task.isComplete = !task.isComplete;
      }
    }
    setTaskData(newTaskData);
  };

  const deleteTask = (taskId) => {
    let taskToBeRemoved;
    for (const task of taskData) {
      if (task.id == taskId) {
        taskToBeRemoved = task;
      }
    }
    const newTaskData = taskData.filter((task) => task != taskToBeRemoved);
    setTaskData(newTaskData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
