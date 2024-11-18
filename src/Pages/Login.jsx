import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../images/Travel.jpg";
import "./Styles/Login.css";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      {/* Left container with image */}
      <div className="left-container">
        <img src={img} alt="Login Illustration" className="left-image" />
      </div>

      {/* Right container with the form */}
      <div className="right-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <div className="input-field">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-box"
              placeholder="Username"
            />
          </div>
          <div className="input-field">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-box"
              placeholder="Password"
            />
            <button className="toggle-btn" onClick={handlePasswordToggle}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="submit-btn">Login</button>

          {/* Sign Up Link Button */}
          <a href="/signup" className="signup-link">
            Do not have an account? Please Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
