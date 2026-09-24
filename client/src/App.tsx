import { useEffect } from "react";
import { io } from "socket.io-client";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import "./responsive.css";

function App() {
  useEffect(() => {
  const socket = io("http://localhost:5000");

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
 return (
  <div className="app">
    <header className="app-header">
      <div>
        <h1>SaaS Application</h1>
        <p>Manage your projects, tasks and subscriptions</p>
      </div>
    </header>

    <main className="app-content">
      <Login />
      <Dashboard />
      <AdminDashboard />
    </main>
  </div>
);
}

export default App;