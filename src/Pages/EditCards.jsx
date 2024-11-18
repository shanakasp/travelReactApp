import {
  CircularProgress,
  Alert as MuiAlert,
  Snackbar,
  TextField,
} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/Addnewcard.css";
import Navbar from "./components/Navbar";

const EditCard = () => {
  const { id } = useParams(); // Access the ID from the URL
  console.log(id); // Check if the id is being correctly captured
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const navigate = useNavigate();

  // Fetch existing card data
  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3001/api/cards/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set the form with existing card data
        setFormData({
          title: response.data.title,
          description: response.data.description,
          image: response.data.image, // You may want to handle image differently (displaying the current image)
          date: response.data.date.split("T")[0], // Ensure the date is in YYYY-MM-DD format
        });
      } catch (error) {
        console.error("Error fetching card data", error);
        setAlertMessage("Failed to fetch card data.");
        setAlertSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [id]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Create form data for image and other fields
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("date", formData.date);

    try {
      // Send the PUT request to update the card
      const response = await axios.put(
        `http://localhost:3001/api/cards/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token for authentication
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // On successful response
      setAlertMessage("Card updated successfully!");
      setAlertSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/dashboard"); // Navigate to dashboard after 2 seconds
      }, 2000);
    } catch (error) {
      // Handle error response
      setAlertMessage("Failed to update card. Please try again.");
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
        <h2>Edit Card ID: {id}</h2>
        {loading && <CircularProgress />}{" "}
        {/* Show a loading spinner while fetching data */}
        {!loading && (
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
              />

              {/* Image Preview Box */}
              <div className="image-preview">
                {/* Show new image preview if selected */}
                {formData.image instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                  />
                )}

                {/* Show existing image preview if no new image is selected */}
                {formData.image && formData.image !== null && (
                  <img
                    src={`http://localhost:3001/${formData.image}`}
                    alt="Existing"
                  />
                )}
              </div>
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
              {loading ? <CircularProgress size={24} /> : "Update Card"}
            </button>
          </form>
        )}
      </div>

      {/* Snackbar for success/error messages */}
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

export default EditCard;
