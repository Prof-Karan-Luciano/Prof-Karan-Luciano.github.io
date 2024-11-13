// src/components/CardList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem';
import './CardList.css';

function CardList({ cards, setCards }) {
  const navigate = useNavigate();

  const addMoreCards = () => {
    navigate('/');
  };

  const removeCard = (idToRemove) => {
    setCards(cards.filter((card) => card.id !== idToRemove));
  };

  return (
    <div className="cardlist-container">
      <h1>Meus Cards</h1>
      <button onClick={addMoreCards} className="add-button">
        Adicionar Novo Card
      </button>
      <div className="cardlist-content">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} removeCard={removeCard} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
