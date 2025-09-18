import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ClientLogin = ({ setStoredClient }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedDataRaw = localStorage.getItem("registeredClients");
    if (!storedDataRaw) {
      alert("No registered clients found. Please register first.");
      return;
    }

    let registeredClients = [];
    try {
      registeredClients = JSON.parse(storedDataRaw);
    } catch {
      alert("Stored client data corrupted. Please register again.");
      return;
    }

    const trimmedUsername = username.trim().toLowerCase();

    const user = registeredClients.find(
      (client) =>
        client.username.toLowerCase() === trimmedUsername &&
        client.password === password
    );

    if (user) {
      alert("Login successful!");

      const clientObj = {
        username: user.username,
        name: user.name || user.username,
        contact: user.contact || "",
        email: user.email || "",
      };

      localStorage.setItem("client", JSON.stringify(clientObj));

      if (setStoredClient) setStoredClient(clientObj);

      navigate("/client-dashboard");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="client-login">
      <div className="client-login-container">
        <h2>Client Login</h2>
        <form onSubmit={handleLogin} className="client-login-form" noValidate>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
            aria-label="Username"
            autoComplete="username"
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              aria-label="Password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="toggle-password-btn"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientLogin;
