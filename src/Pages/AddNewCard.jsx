import {
  CircularProgress,
  Alert as MuiAlert,
  Snackbar,
  TextField,
} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Addnewcard.css";
import Navbar from "./components/Navbar";

const AddNewCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
  });

  const [previewImage, setPreviewImage] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const navigate = useNavigate();

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
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Set the image preview URL
    }
    setFormData({
      ...formData,
      image: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("date", formData.date);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/cards",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlertMessage("Card added successfully!");
      setAlertSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setAlertMessage("Failed to add card. Please try again.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
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
            {/* Image preview */}
            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: "200px", height: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <TextField
              fullWidth
              variant="filled"
              type="date"
              value={formData.date}
              name="date"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {loading ? <CircularProgress size={24} /> : "Add Card"}
          </button>
        </form>
      </div>

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

export default AddNewCard;
