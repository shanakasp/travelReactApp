import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "../Styles/Dashboard.css";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
          if (data && data.name) {
            setUserName(data.name);
          } else {
            setUserName("Unknown User");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUserName("Error fetching name"); // Handle errors gracefully
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the API call completes
        });
    } else {
      setUserName("No User");
      setLoading(false);
    }
  }, [userId, token]); // Re-run the effect when userId or token changes

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
          <button className="logout-btn">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
