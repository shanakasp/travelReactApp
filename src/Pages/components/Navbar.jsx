import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Swal from "sweetalert2"; // Import SweetAlert2
import "../Styles/Dashboard.css";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // For navigation

  // Fetch username from the API when the component mounts
  useEffect(() => {
    if (userId && token) {
      fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.email) {
            setUserName(data.email);
          } else {
            setUserName("Unknown User");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUserName("Error fetching name");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUserName("No User");
      setLoading(false);
    }
  }, [userId, token]);

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear userId and token from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        // Redirect to the home page
        navigate("/");
      }
    });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <h1 className="logo">TravelKeeper</h1>
        </div>
        <div className="navbar-right">
          {loading ? (
            <span className="user-name">Loading...</span> // Show loading state while fetching data
          ) : (
            <span className="user-name">{userName}</span> // Show fetched username
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
