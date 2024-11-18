import { TextField } from "@mui/material"; // Import Material UI TextField for styling
import React, { useState } from "react";
import "./Styles/Addnewcard.css";
import Navbar from "./components/Navbar";

const AddNewCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "", // Changed to an empty string for date format
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // You can add your form submission logic here (e.g., sending the data to the server)
  };

  return (
    <div className="addNewCardContainer">
      <Navbar />
      <div className="add-new-card">
        <h2>Add New Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <TextField
              fullWidth
              variant="filled"
              type="date" // Using type="date" for the date input
              value={formData.date}
              name="date"
              onChange={handleChange} // Handle change for the date
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCard;
