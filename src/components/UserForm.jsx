import React, { useState, useEffect } from 'react'

const UserForm = ({ onUserAdd }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      setError('Both username and email are required.')
      return
    }
    setError('')

    const userData = { username, email }

    fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        onUserAdd(data)
        setUsername('')
        setEmail('');
        setUsers([...users, data])
      })
      .catch((error) => setError('Error creating user: ' + error.message))
  }

  const handleDelete = (id) => {
    fetch(`/user/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== id))
      })
      .catch((error) => console.error('Error deleting user:', error))
  }

  return (
    <div>
      <h2>Create A New User</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      <h3>Existing Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserForm;
