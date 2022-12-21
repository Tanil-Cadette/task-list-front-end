import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          description={task.description}
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.is_complete}
          onToggleComplete={props.onToggleComplete}
          onDeleteTask={props.onDeleteTask}
        />
      );
    });
  };
  return (
    <ul className="tasks__list no-bullet">{getTaskListJSX(props.tasks)}</ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,

      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool,
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
