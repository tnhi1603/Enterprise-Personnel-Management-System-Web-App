import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list-container">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} className="task-item">
            {task}
          </div>
        ))
      ) : (
        <div>No tasks for this day.</div>
      )}
    </div>
  );
};

export default TaskList;
