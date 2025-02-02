import React, { useState, useEffect } from 'react';

const TaskForm = ({ onTaskAdd, onTaskUpdate, onTaskDelete }) => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [tasks, setTasks] = useState([]);

  // Fetching tasks when the component is mounted
  useEffect(() => {
    fetch('http://127.0.0.1:5000/task')  // Updated to use local API
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Handle the form submission to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, status };

    fetch('http://127.0.0.1:5000/task', {  // Updated to use local API
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        onTaskAdd(data);
        setTitle(''); // Reset form
        setDescription('');
        setStatus('pending');
        setTasks([...tasks, data]);  // Update task list
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  // Handle task deletion
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/task/${id}`, { method: 'DELETE' })  // Updated to use local API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        return response.json();
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));  // Remove task from state
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  // Handle task update (edit)
  const handleUpdate = (id) => {
    const updatedTask = { title, description, status };

    fetch(`http://127.0.0.1:5000/task/${id}`, {  // Updated to use local API
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        onTaskUpdate(data);
        setTasks(tasks.map((task) => (task.id === id ? data : task)));
        // Clear the form after update
        setTaskId('');
        setTitle('');
        setDescription('');
        setStatus('pending');
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  // Pre-fill form for editing a task
  const handleEdit = (task) => {
    setTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  return (
    <div>
      <h2>{taskId ? 'Edit Task' : 'Add Task'}</h2>
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
        <button type="submit">{taskId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <h3>Existing Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleEdit(task)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
