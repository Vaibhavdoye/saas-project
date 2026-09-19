import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/admin/users",
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

  return (
    <section>
      <h3>Admin Dashboard</h3>

      <h4>Users</h4>

      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default AdminDashboard;