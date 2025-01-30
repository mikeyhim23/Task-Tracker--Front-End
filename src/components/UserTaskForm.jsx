import React, { useState, useEffect } from 'react';

const UserTaskForm = ({ onUserTaskAdd, onUserTaskDelete }) => {
  const [userTaskId, setUserTaskId] = useState('');
  const [userId, setUserId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    fetch('/user-task')
      .then((response) => response.json())
      .then((data) => setUserTasks(data))
      .catch((error) => console.error('Error fetching user tasks:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserTask = { userId, projectId, role };

    fetch('/user-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserTask),
    })
      .then((response) => response.json())
      .then((data) => {
        onUserTaskAdd(data);
        setUserId('');
        setProjectId('');
        setRole('');
        setUserTasks([...userTasks, data])
      })
      .catch((error) => setError('Error adding user task: ' + error.message))
  }

  const handleDelete = (id) => {
    fetch(`/user-task/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        onUserTaskDelete(id);
        setUserTasks(userTasks.filter((task) => task.id !== id))
      })
      .catch((error) => console.error('Error deleting user task:', error))
  }

  return (
    <div>
      <h2>User Task Form</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="projectId">Project ID</label>
          <input
            type="text"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="submit">Assign Task</button>
      </form>

      <h3>Existing User Tasks</h3>
      <ul>
        {userTasks.map((task) => (
          <li key={task.id}>
            User ID: {task.userId}, Project ID: {task.projectId}, Role: {task.role}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserTaskForm
