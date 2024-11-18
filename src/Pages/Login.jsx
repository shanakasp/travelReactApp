import { Alert as MuiAlert, Snackbar } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import LoginPage, { Logo, Password, Username } from "@react-login-page/page5";
import axios from "axios";
import React, { useState } from "react";
import LoginLogo from "react-login-page/logo-rect";
import { useNavigate } from "react-router-dom";

const styles = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
};

const Demo = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: username,
          password: password,
        }
      );

      const { message, userId, token } = response.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      setAlertMessage(message);
      setAlertSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.error);
        setAlertSeverity("error");
      } else {
        setAlertMessage("An unexpected error occurred");
        setAlertSeverity("error");
      }
      setOpenSnackbar(true);
    } finally {
      // Hide loading state after the request is done
      setLoading(false);
    }
  };

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

      {/* Snackbar for displaying alert messages */}
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

export default Demo;
