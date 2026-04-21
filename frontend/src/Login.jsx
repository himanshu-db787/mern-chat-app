import { useState } from "react";
import axios from "axios";
import "./Login.css";

const API_URL = "https://mern-chat-backend-8wf3.onrender.com/api";

function Login({ setIsLoggedIn, setUsername, showRegisterPage }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        username: user,
        password: pass,
      });

      // Save credentials and enter chat
      localStorage.setItem("chat_token", data.token);
      localStorage.setItem("chat_username", data.username);
      setUsername(data.username);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Check your password.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <p className="error-text">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="switch-link" onClick={showRegisterPage}>
          Don't have an account? Register here.
        </p>
      </div>
    </div>
  );
}

export default Login;