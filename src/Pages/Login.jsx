import LoginPage, { Logo, Password, Username } from "@react-login-page/page5";
import React, { useState } from "react";
import LoginLogo from "react-login-page/logo-rect";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
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
