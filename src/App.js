import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const TASKS = [
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
  const [taskData, setTaskData] = useState(TASKS);
  const setTaskDatahehe = () => {
    return axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        const ourData = response.data;
        const newData = [...ourData];
        setTaskData(newData);
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
  /* lets us get Task data when the component is mounted by using useEffect and an empty dependency list*/
  useEffect(
    () =>
      axios
        .get('https://task-list-api-c17.herokuapp.com/tasks')
        .then((response) => {
          setTaskData(response.data);
          console.log(response.data);
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
        }),
    []
  );

  const toggleComplete = (taskId) => {
    checkIfComplete(taskId).then((result) => {
      if (result) {
        axios
          .patch(
            `https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_incomplete`
          )
          .then((response) => {
            console.log('you clicked to mark incomplete');
            //setTaskData(getTaskData());
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
      } else {
        axios
          .patch(
            `https://task-list-api-c17.herokuapp.com/tasks/${taskId}/mark_complete`
          )
          .then((response) => {
            console.log('you clicked to mark complete');
            //setTaskData(getTaskData());
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
      }
      setTaskDatahehe();
    });
  };

  /* wtf */

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
        console.log(response.data);
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
