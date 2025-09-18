import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FarmerLogin = ({ setStoredFarmer }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedDataRaw = localStorage.getItem("registeredFarmers");
    if (!storedDataRaw) {
      alert("No registered users found. Please register first.");
      return;
    }

    let registeredFarmers = [];
    try {
      registeredFarmers = JSON.parse(storedDataRaw);
    } catch {
      alert("Stored user data corrupted. Please register again.");
      return;
    }

    const trimmedUsername = username.trim().toLowerCase();

    // Find user matching username (case-insensitive) and password
    const user = registeredFarmers.find(
      (farmer) =>
        farmer.username.toLowerCase() === trimmedUsername &&
        farmer.password === password
    );

    if (user) {
      alert("Login successful!");

      // Prepare logged-in user object (add more fields if needed)
      const farmerObj = {
        username: user.username,
        name: user.name || user.username,
        contact: user.contact || "",
        email: user.email || "",
      };

      // Save current logged-in user
      localStorage.setItem("farmer", JSON.stringify(farmerObj));

      // Update app-level farmer state immediately
      if (setStoredFarmer) setStoredFarmer(farmerObj);

      navigate("/farmer-dashboard");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="farmer-login">
      <div className="farmer-login-container">
        <h2>Farmer Login</h2>
        <form onSubmit={handleLogin} className="farmer-login-form" noValidate>
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

export default FarmerLogin;
