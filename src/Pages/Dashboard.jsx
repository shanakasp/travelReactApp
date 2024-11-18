import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Styles/Dashboard.css";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Card 1",
      date: "2024-11-18",
      imageUrl: "https://via.placeholder.com/100", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Card 2",
      date: "2024-11-17",
      imageUrl: "https://via.placeholder.com/100", // Replace with an actual image URL
    },
  ]);

  const handleAddCard = () => {
    navigate("/addNewCard");
  };

  const handleEditCard = (id) => {
    // Edit card logic here
    console.log(`Edit card with id ${id}`);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
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
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.imageUrl} alt={card.name} className="card-image" />
            <div className="card-details">
              <h3 className="card-name">{card.name}</h3>
              <p className="card-date">{card.date}</p>
            </div>
            <div className="card-actions">
              <button
                onClick={() => handleEditCard(card.id)}
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
