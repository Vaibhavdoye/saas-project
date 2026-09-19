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

        const response = await fetch("http://localhost:5000/api/projects", {
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
  const socket = io("http://localhost:5000");

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

      const response = await fetch("http://localhost:5000/api/projects", {
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
    <section>
      <h3>Projects</h3>

      <button onClick={() => setShowForm(!showForm)}>
        Create Project
      </button>

      {showForm && (
        <div>
          <h4>Create New Project</h4>

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />

          <button onClick={handleCreateProject}>Create</button>
        </div>
      )}

    <div>
  <h4>My Projects</h4>

  {projects.length === 0 ? (
    <p>No projects available.</p>
  ) : (
    projects.map((project) => (
      <div key={project._id}>
        <h5>{project.name}</h5>
        <p>{project.description}</p>
        <p>Project ID: {project._id}</p>
      </div>
    ))
  )}
</div>
    </section>
  );
}

export default ProjectSection;