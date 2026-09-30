import { useEffect, useState } from "react";
interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

interface AdminProject {
  _id: string;
  name: string;
  description: string;
  owner?: {
    name: string;
  };
}
function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
const [projects, setProjects] = useState<AdminProject[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://saas-backend-nx6q.onrender.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);
    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://saas-backend-nx6q.onrender.com/api/admin/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  const handleDeleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://saas-backend-nx6q.onrender.com/api/admin/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("User deleted successfully");

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error");
  }
};
const handleDeleteProject = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://saas-backend-nx6q.onrender.com/api/admin/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Project deleted successfully");

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error");
  }
};
  return (
    <section className="admin-section">
      <div className="section-header">
        <div>
          <h3>Admin Dashboard</h3>
          <p>Manage registered users and their roles.</p>
        </div>
      </div>

      <div className="admin-users">
        <div className="admin-users-header">
          <h4>Users</h4>
          <span>{users.length} Users</span>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users available.</p>
          </div>
        ) : (
          <div className="users-list">
            {users.map((user) => (
              <div className="user-card" key={user._id}>
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                  </div>
                </div>

                <span className={`role-badge ${user.role}`}>
                  {user.role}
                </span>
                <button
  className="delete-button"
  onClick={() => handleDeleteUser(user._id)}
>
  Delete
</button>
              </div>
            ))}
          </div>
              )}
      </div>

      {/* Projects Management */}
      <div className="admin-users">
        <div className="admin-users-header">
          <h4>Projects</h4>
          <span>{projects.length} Projects</span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects available.</p>
          </div>
        ) : (
          <div className="users-list">
            {projects.map((project) => (
              <div className="user-card" key={project._id}>
                <div className="user-info">
                  <div className="user-avatar">
                    {project.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h5>{project.name}</h5>
                    <p>{project.description}</p>
                  </div>
                </div>

                <span className="role-badge user">
                  {project.owner?.name || "Unknown"}
                </span>
                <button
  className="delete-button"
  onClick={() => handleDeleteProject(project._id)}
>
  Delete
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;