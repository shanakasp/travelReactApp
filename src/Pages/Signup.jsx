import { Alert as MuiAlert, Snackbar } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success"); // Default to success
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.username, // You can change this if needed
          password: formData.password,
          location: formData.location,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        setAlertSeverity("success");
        setAlertMessage(data.message);
        setOpenSnackbar(true);

        // Store userId and token in localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);

        // Redirect to /dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        // Error during signup
        setAlertSeverity("error");
        setAlertMessage(data.message || "Something went wrong.");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage("Network error. Please try again later.");
      setOpenSnackbar(true);
    }
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
          <label className="faded-bold-label">Email</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              paddingRight: "8px",
              borderRadius: "4px",
              border: "2px solid #FFA8AF",
              padding: "4px",
            }}
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
            style={{
              width: "100%",
              paddingRight: "8px",
              borderRadius: "4px",
              border: "2px solid #FFA8AF",
              padding: "4px",
            }}
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
            style={{
              width: "100%",
              paddingRight: "8px",
              borderRadius: "4px",
              border: "2px solid #FFA8AF",
              padding: "4px",
            }}
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
            style={{
              width: "100%",
              paddingRight: "8px",
              borderRadius: "4px",
              border: "2px solid #FFA8AF",
              padding: "4px",
            }}
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
            style={{
              width: "100%",

              borderRadius: "4px",
              border: "2px solid #FFA8AF",
              padding: "4px",
            }}
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

      {/* Snackbar for Success/Error Alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity={alertSeverity}
          elevation={6}
          variant="filled"
          sx={{ color: "#fff" }}
        >
          <AlertTitle>
            {alertSeverity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Signup;
