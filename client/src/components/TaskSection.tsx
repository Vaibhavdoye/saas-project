import { useEffect, useState } from "react";

function TaskSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/tasks?project=${project}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.log("Failed to fetch tasks");
      }
    };

    if (project) {
      fetchTasks();
    }
  }, [project]);

  const handleUpdateTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: "Updated Task",
            description: "Task updated from frontend",
            status: "in-progress",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Task updated successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Task deleted successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          project,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Task created successfully");
        setTitle("");
        setDescription("");
        setProject("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <section className="task-section">
      <div className="section-header">
        <div>
          <h3>Tasks</h3>
          <p>Create and manage tasks for your projects.</p>
        </div>
      </div>

      <div className="task-form">
        <h4>Create New Task</h4>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Project ID"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        <button className="primary-button" onClick={handleCreateTask}>
          + Create Task
        </button>
      </div>

      <div className="tasks-container">
        <div className="projects-title">
          <h4>My Tasks</h4>
          <span>{tasks.length} Tasks</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks available.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-card-top">
                  <h5>{task.title}</h5>
                  <span className={`task-status ${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <p>{task.description}</p>

                <div className="task-actions">
                  <button
                    className="secondary-button"
                    onClick={() => handleUpdateTask(task._id)}
                  >
                    Update Task
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TaskSection;