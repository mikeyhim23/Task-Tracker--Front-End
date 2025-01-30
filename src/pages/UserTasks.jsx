import React, { useState, useEffect } from 'react'
import UserTaskForm from '../components/UserTaskForm'


const UserTask = () => {
  const [userTasks, setUserTasks] = useState([])

  useEffect(() => {
    fetch('/user-task')
      .then((response) => response.json())
      .then((data) => setUserTasks(data))
      .catch((error) => console.error('Error fetching user tasks:', error))
  }, [])

  const handleUserTaskAdd = (userTask) => {
    setUserTasks([...userTasks, userTask])
  }

  const handleUserTaskDelete = (userTask) => {
    setUserTasks(userTasks.filter((task) => task.id !== userTask.id))
  }

  return (
    <div>
      <h2>Manage User Tasks</h2>
      <UserTaskForm onUserTaskAdd={handleUserTaskAdd} onUserTaskDelete={handleUserTaskDelete} />
      <h3>User Tasks</h3>
      <ul>
        {userTasks.map((userTask) => (
          <li key={userTask.id}>
            User ID: {userTask.userId}, Project ID: {userTask.projectId}, Role: {userTask.role}
            <button onClick={() => handleUserTaskDelete(userTask)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserTask;
