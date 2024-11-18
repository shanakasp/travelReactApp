import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddNewCard from "./Pages/AddNewCard";
import Dashboard from "./Pages/Dashboard";
import EditCards from "./Pages/EditCards";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Route for LoginPage */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/editCard/:id" element={<EditCards />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addNewCard" element={<AddNewCard />} />
      </Routes>
    </Router>
  );
};

export default App;
