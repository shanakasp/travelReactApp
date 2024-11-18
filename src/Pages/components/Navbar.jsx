import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "../Styles/Dashboard.css";
const Navbar = () => {
  const userName = "Shana K";
  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <h1 className="logo">TravelKeeper</h1>
        </div>
        <div className="navbar-right">
          <span className="user-name">{userName}</span>
          <button className="logout-btn">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
