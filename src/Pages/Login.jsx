import LoginPage, { Logo, Password, Username } from "@react-login-page/page5";
import axios from "axios"; // Import axios for making API requests
import React, { useState } from "react";
import LoginLogo from "react-login-page/logo-rect";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const styles = {
  height: "100vh", // Full height of the viewport
  display: "flex", // Center the form
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5", // Optional background color
};

const Demo = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state during API request

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display loading state
    setLoading(true);

    try {
      // Make the POST request to the API
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: username, // assuming username is email
          password: password,
        }
      );

      // Extract userId and token from response
      const { message, userId, token } = response.data;

      // Store the userId and token in local storage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      // Show success notification
      toast.success(message);

      // Wait for 3 seconds before navigating
      setTimeout(() => {
        navigate("/dashboard"); // Navigate to the dashboard or another page
      }, 3000);
    } catch (error) {
      // If there is an error (wrong credentials or server issue)
      if (error.response) {
        // Handle known error responses (e.g. wrong username/password)
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      // Hide loading state after the request is done
      setLoading(false);
    }
  };

  // Handle the sign-up click to navigate to the signup page
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div style={styles}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          height: "100vh",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <LoginPage>
          <h3>Keep your memories with you</h3>
          <p style={{ cursor: "pointer" }}>
            Not a member? <a onClick={handleSignUpClick}>Sign up now</a>
          </p>
          <Username
            name="userUserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password
            placeholder="Password"
            name="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Logo>
            <LoginLogo />
          </Logo>
        </LoginPage>
      </form>
    </div>
  );
};

export default Demo;
