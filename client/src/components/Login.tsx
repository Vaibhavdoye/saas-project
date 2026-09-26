import { useState } from "react";

interface LoginProps {
  onLogin: (token: string, role: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://saas-backend-nx6q.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        // Get role from JWT token
        const payload = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );

        const role = payload.role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        onLogin(token, role);

        alert("Login successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">S</div>
          <h2>Welcome Back</h2>
          <p>Sign in to your SaaS Application</p>
        </div>

        <div className="login-form">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;