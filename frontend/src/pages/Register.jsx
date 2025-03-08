import { useState } from "react";
import API from "../api"; // Import API
import "../App.css"; // Import styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed from name to username
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send data to backend
      const { data } = await API.post("/api/auth/register", {
        username: formData.username, // Changed from name to username
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      // Store token & notify user
      localStorage.setItem("token", data.token);
      alert("Registration successful! ✅");
    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed!");
      alert("Registration failed! ❌");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create an Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label htmlFor="username">Full Name</label> {/* Changed from name to username */}
            <input
              type="text"
              name="username" // Changed from name to username
              className="register-input"
              placeholder="Enter your full name"
              value={formData.username} // Changed from name to username
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              className="register-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="register-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="register-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;