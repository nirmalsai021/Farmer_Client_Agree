import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ClientRegister.css";

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCanSubmit(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Please fill the form correctly before submitting.");
      return;
    }

    const registeredClients =
      JSON.parse(localStorage.getItem("registeredClients")) || [];

    // Duplicate username & email checks
    const exactMatchUser = registeredClients.find(
      (client) =>
        client.username.toLowerCase() === formData.username.trim().toLowerCase() &&
        client.email.toLowerCase() === formData.email.trim().toLowerCase()
    );
    if (exactMatchUser) {
      alert("You are already registered. Please login.");
      return;
    }

    const usernameTaken = registeredClients.find(
      (client) =>
        client.username.toLowerCase() === formData.username.trim().toLowerCase() &&
        client.email.toLowerCase() !== formData.email.trim().toLowerCase()
    );
    if (usernameTaken) {
      alert("Username is already taken by another user.");
      return;
    }

    const emailTaken = registeredClients.find(
      (client) =>
        client.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        client.username.toLowerCase() !== formData.username.trim().toLowerCase()
    );
    if (emailTaken) {
      alert("Email is already registered with another user.");
      return;
    }

    // Save new client
    const newClient = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    registeredClients.push(newClient);
    localStorage.setItem("registeredClients", JSON.stringify(registeredClients));

    alert(`Client registration successful for ${newClient.username}`);

    // Redirect to client login
    navigate("/client/login");
  };

  return (
    <div className="client-register">
      <h2>Client Registration</h2>
      <form onSubmit={handleSubmit} className="client-register-form" noValidate>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder={errors.username ? errors.username : "Enter username"}
            className={errors.username ? "input-error" : ""}
            aria-describedby="username-error"
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={errors.email ? errors.email : "Enter email"}
            className={errors.email ? "input-error" : ""}
            aria-describedby="email-error"
            autoComplete="email"
          />
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Password:</label>
          <div className="password-field">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={errors.password ? errors.password : "Enter password"}
              className={errors.password ? "input-error" : ""}
              aria-describedby="password-error"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="toggle-password-btn"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="form-group password-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-field">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={
                errors.confirmPassword ? errors.confirmPassword : "Confirm password"
              }
              className={errors.confirmPassword ? "input-error" : ""}
              aria-describedby="confirmPassword-error"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="toggle-password-btn"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default ClientRegister;
