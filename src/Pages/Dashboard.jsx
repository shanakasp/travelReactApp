import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation on delete
import "./Styles/Dashboard.css";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch the cards for the logged-in user
  useEffect(() => {
    if (userId && token) {
      fetch(`http://localhost:3001/api/cards/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCards(data); // Set the fetched cards to state
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false); // If no userId or token, just stop loading
    }
  }, [userId, token]);

  const handleAddCard = () => {
    navigate("/addNewCard");
  };

  const handleEditCard = (id) => {
    navigate(`/editCard/${id}`); // Navigate to edit card page (if applicable)
  };

  const handleDeleteCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This card will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the API request to delete the card
        fetch(`http://localhost:3001/api/cards/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            // Remove the deleted card from state
            setCards(cards.filter((card) => card._id !== id));
            Swal.fire("Deleted!", "Your card has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting card:", error);
            Swal.fire(
              "Error!",
              "There was an issue deleting your card.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar />

      {/* Add New Card Button */}
      <button className="add-card-btn" onClick={handleAddCard}>
        Add new card
      </button>

      {/* Cards List */}
      <div className="cards-container">
        {loading ? (
          <p>Loading cards...</p>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div className="card" key={card._id}>
              <img
                src={`http://localhost:3001/${card.image}`} // Display image preview
                alt={card.title}
                className="card-image"
              />
              <div className="card-details">
                <h3 className="card-name">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <p className="card-date">
                  {new Date(card.date).toLocaleDateString()} {/* Format date */}
                </p>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => handleEditCard(card._id)}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCard(card._id)}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
