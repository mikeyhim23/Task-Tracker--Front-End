import React, { useState, useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error))
  }, []);

  const handleProjectAdd = (project) => {
    setProjects([...projects, project])
  };

  const handleDelete = (id) => {
    fetch(`/https://task-tracker-back-end.onrender.com/project/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
      })
      .catch((error) => console.error('Error deleting project:', error));
  };

  return (
    <div>
      <h2>Manage Projects</h2>
      <ProjectForm onProjectAdd={handleProjectAdd} />
      <h3>Projects</h3>
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

export default Project;
