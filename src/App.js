import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const dummyTask = [
  {
    id: 1,
    title: 'Mow the lawn',
    description: 'do now',
    isComplete: true,
  },
];

const checkIfComplete = (taskId) => {
  return axios
    .get(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}`)
    .then((response) => {
      return response.data['task']['is_complete'];
    });
};

const App = () => {
  const [taskData, setTaskData] = useState(dummyTask);

  const updateTasks = () => {
    return axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.log(
          "Anything that isn't status code 2XX is an error:",
          error.response.status
        );
        console.log(
          'The data from response with an error:',
          error.response.data
        );
      });
  };

  useEffect(() => updateTasks(), []);

  const toggleComplete = (taskId) => {
    let url, message;
    checkIfComplete(taskId).then((result) => {
      if (result) {
        url = `https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_incomplete`;
        message = `The completed task with task id = ${taskId} was marked as incomplete`;
      } else {
        url = `https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_complete`;
        message = `The incomplete task with task id = ${taskId} was marked as complete`;
      }
      axios.patch(url).then((response) => {
        console.log(message);
        console.log(
          `task that was changed is ${response.data['task']['title']}`
        );
        updateTasks();
      });
    });
  };
  /*
    const newTaskData = [...taskData];
    for (const task of newTaskData) {
      if (task.id == taskId) {
        task.isComplete = !task.isComplete;
      }
    }
    setTaskData(newTaskData);
    */

  const deleteTask = (taskId) => {
    axios
      .delete(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}`)
      .then((response) => {
        console.log(response.body);
        updateTasks();
      });
    /*
    let taskToBeRemoved;
    for (const task of taskData) {
      if (task.id == taskId) {
        taskToBeRemoved = task;
      }
    }
    const newTaskData = taskData.filter((task) => task != taskToBeRemoved);
    setTaskData(newTaskData);
    */
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pavi and Tania&apos;s Task List</h1>
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
