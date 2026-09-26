import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import Dashboard from "./components/Dashboard";

import Login from "./components/Login";

import AdminDashboard from "./components/AdminDashboard";

import "./responsive.css";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  useEffect(() => {
    const socket = io("https://saas-backend-nx6q.onrender.com");

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogin = (newToken: string, newRole: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);

    setToken(newToken);
    setRole(newRole);
  };

  return (
    <div className="app">
      <header className="app-header">
  <div>
    <h1>SaaS Application</h1>
    <p>Manage your projects, tasks and subscriptions</p>
  </div>

  {token && (
    <button
      className="logout-button"
      onClick={() => {
        localStorage.clear();
        setToken(null);
        setRole(null);
      }}
    >
      Logout
    </button>
  )}
</header>

      <main className="app-content">
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : role === "admin" ? (
          <AdminDashboard />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;