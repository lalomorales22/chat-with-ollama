import React, { useState } from 'react';

function TaskList({ tasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <div className="task-list">
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet. Tasks will appear here as they are identified in the conversation.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} onClick={() => toggleTask(index)}>
              <input
                type="checkbox"
                checked={completedTasks.includes(index)}
                readOnly
              />
              <span style={{ textDecoration: completedTasks.includes(index) ? 'line-through' : 'none' }}>
                {task}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;