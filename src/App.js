import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskInput from './components/NewTaskForm.js';
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

  const addNewTaskData= newTask => {

    return axios
      .post('https://task-list-api-c17.herokuapp.com/tasks', newTask)
      .then((response) => {
        const newTaskList = [...taskData];
        const nextId = Math.max(...newTaskList.map(task => task.id)) +1;
        newTaskList.push({
            title: response.data.title,
            description: response.data.description,
            id: nextId,
            isComplete: false,
            ...newTask});
        setTaskData(newTaskList);
      })
      .catch((error) => {
        console.log(
          "Anything that isn't status code 2XX is an error:",
          error.response.status,
          error
        );
      });
  };

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
    // axios
    //   .delete(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}`)
    //   .then((response) => {
    //     console.log(response.body);
    //     updateTasks();
    //   });
    axios 
      .delete(`https://task-list-api-c17.herokuapp.com/tasks/${taskId}`)
      .then(()=> {
        const newTask= taskData.filter((task) => task.id !== taskId);
        setTaskData(newTask);
      })
      .catch((error) => {
        console.log(error);
      });
    };


  
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
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main className='App-main'>
        <div>
          {
            <TaskList
              tasks={taskData}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
            />
          }
        </div>
        <div className='Form-style'>
        <NewTaskInput
        addTaskCallback= {addNewTaskData}></NewTaskInput>
        </div>
      </main>
    </div>
  );
};

export default App;
