import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.onToggleComplete(props.id)}
      >
        {props.title}
      </button>

      <button
        className="tasks__item__remove button"
        onClick={() => props.onDeleteTask(props.id)}
      >
        x
      </button>

      <p className="task__item__description">
        Description:
        {props.description}
      </p>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
