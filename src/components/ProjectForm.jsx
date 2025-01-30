import React, { useState, useEffect } from 'react'

const ProjectForm = ({ onProjectAdd }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState('')
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/project')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Project name is required')
      return
    }
    setError('')

    const newProject = { name, description }

    fetch('/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        onProjectAdd(data);
        setName('');
        setDescription('');
        setProjects([...projects, data])
      })
      .catch((error) => console.error('Error adding project:', error))
  }

  const handleDelete = (id) => {
    fetch(`/project/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
      })
      .catch((error) => console.error('Error deleting project:', error))
  }

  return (
    <div>
      <h2>Project Form</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Project</button>
      </form>

      <h3>Existing Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.description}
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectForm
