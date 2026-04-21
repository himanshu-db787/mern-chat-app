import { useState } from "react";
import axios from "axios";
import "./Register.css";

const API_URL = "https://mern-chat-backend-8wf3.onrender.com/api";

function Register({ showLoginPage }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_URL}/register`, {
        username: user,
        password: pass,
      });

      alert("Account created successfully! Please log in.");
      showLoginPage(); // Send them back to the login screen
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Username might be taken.");
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        {error && <p className="error-text">{error}</p>}
        
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Choose a Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit" className="reg-btn">Sign Up Now</button>
        </form>

        <p className="switch-link" onClick={showLoginPage}>
          Already have an account? Login here.
        </p>
      </div>
    </div>
  );
}

export default Register;