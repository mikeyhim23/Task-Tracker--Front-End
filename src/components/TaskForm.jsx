import React, { useState, useEffect } from 'react';

const TaskForm = ({ onTaskAdd, onTaskUpdate, onTaskDelete }) => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/task')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, status };

    fetch('/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        onTaskAdd(data)
        setTitle('')
        setDescription('')
        setStatus('pending')
        setTasks([...tasks, data])
      })
      .catch((error) => console.error('Error adding task:', error))
  }

  const handleDelete = (id) => {
    fetch(`/task/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id))
      })
      .catch((error) => console.error('Error deleting task:', error))
  }

  const handleUpdate = (id) => {
    const updatedTask = { title, description, status }

    fetch(`/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        onTaskUpdate(data)
        setTasks(tasks.map((task) => (task.id === id ? data : task)))
      })
      .catch((error) => console.error('Error updating task:', error))
  }

  return (
    <div>
      <h2>Task Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>

      <h3>Existing Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleUpdate(task.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskForm;
