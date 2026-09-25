import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ProjectSection() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://saas-backend-nx6q.onrender.com/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.log("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const socket = io("https://saas-backend-nx6q.onrender.com");

    socket.on("projectCreated", (project) => {
      setProjects((prevProjects) => [...prevProjects, project]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://saas-backend-nx6q.onrender.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project created successfully");
        setName("");
        setDescription("");
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <section className="project-section">
      <div className="section-header">
        <div>
          <h3>Projects</h3>
          <p>Manage your projects and track their progress.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Create Project
        </button>
      </div>

      {showForm && (
        <div className="project-form">
          <h4>Create New Project</h4>

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-actions">
            <button className="primary-button" onClick={handleCreateProject}>
              Create
            </button>

            <button
              className="secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="projects-container">
        <div className="projects-title">
          <h4>My Projects</h4>
          <span>{projects.length} Projects</span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects available.</p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project._id}>
                <div className="project-card-top">
                  <h5>{project.name}</h5>
                  <span className="status-badge">Active</span>
                </div>

                <p>{project.description}</p>

                <div className="project-id">
                  Project ID: {project._id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectSection;