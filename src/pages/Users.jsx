import React, { useState, useEffect } from 'react'
import UserForm from '../components/UserForm'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error))
  }, [])

  const handleUserAdd = (user) => {
    setUsers([...users, user])
  }

  const handleDelete = (id) => {
    fetch(`/https://task-tracker-back-end.onrender.com/user/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== id))
      })
      .catch((error) => console.error('Error deleting user:', error))
  }

  return (
    <div>
      <h2>Manage Users</h2>
      <UserForm onUserAdd={handleUserAdd} />
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User;
