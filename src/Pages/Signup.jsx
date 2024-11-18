import React, { useState } from "react";

const styles = {
  height: "100vh", // Full height of the viewport
  display: "flex", // Center the form
  justifyContent: "center",
  alignItems: "center",
};

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Form Submitted:", formData);
    alert("Signup successful!");
  };

  return (
    <div style={styles}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#f45a68",
          }}
        >
          Create Your Account
        </h3>
        {/* Username */}
        <div style={{ marginBottom: "10px" }}>
          <label className="faded-bold-label">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", paddingRight: "8px", borderRadius: "4px" }}
          />
        </div>
        {/* Password */}
        <div style={{ marginBottom: "10px" }}>
          <label className="faded-bold-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", paddingRight: "8px", borderRadius: "4px" }}
          />
        </div>
        {/* Confirm Password */}
        <div style={{ marginBottom: "10px" }}>
          <label className="faded-bold-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", paddingRight: "8px", borderRadius: "4px" }}
          />
        </div>
        {/* Location */}
        <div style={{ marginBottom: "10px" }}>
          <label className="faded-bold-label">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: "100%", paddingRight: "8px", borderRadius: "4px" }}
          />
        </div>
        {/* Phone Number */}
        <div style={{ marginBottom: "10px" }}>
          <label className="faded-bold-label">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", paddingRight: "8px", borderRadius: "4px" }}
          />
        </div>
        {/* Error Message */}
        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </p>
        )}
        {/* Submit Button */}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
