import React, { useState, useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'

const Project = () => {
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/project')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error))
  }, [])

  const handleProjectSave = (updatedProject) => {
    if (editingProject) {
      setProjects(projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      ))
      setEditingProject(null) 
    } else {
      setProjects([...projects, updatedProject])
    }
  }

  const handleDelete = (id) => {
    // Delete a project by its id
    fetch(`http://127.0.0.1:5000/project/${id}`, { method: 'DELETE' })
      .then(() => setProjects(projects.filter((project) => project.id !== id)))
      .catch((error) => console.error('Error deleting project:', error))
  }

  const handleEdit = (project) => {
    // Set the selected project for editing
    setEditingProject(project)
  }

  return (
    <div>
      <h2>Manage Projects</h2>
      <ProjectForm onProjectSave={handleProjectSave} existingProject={editingProject} />
      
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.description}
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Project
