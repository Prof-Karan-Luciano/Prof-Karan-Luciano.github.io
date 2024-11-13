// src/components/CardItem.js
import React, { useState, useRef, useEffect } from 'react';
import './CardItem.css';

function CardItem({ card, removeCard }) {
  const [expandido, setExpandido] = useState(false);
  const cardBodyRef = useRef(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    if (expandido) {
      setBodyHeight(cardBodyRef.current.scrollHeight);
    } else {
      setBodyHeight(0);
    }
  }, [expandido]);

  const toggleExpandir = () => {
    setExpandido(!expandido);
  };

  return (
    <div className="card">
      <div className="card-header" onClick={toggleExpandir}>
        <img src={card.foto} alt="Foto" className="card-image" />
      </div>
      <div
        className="card-body"
        ref={cardBodyRef}
        style={{ maxHeight: `${bodyHeight}px` }}
      >
        <h2>{card.nome}</h2>
        <p>
          <strong>Cargo:</strong> {card.cargo}
        </p>
        <p>
          <strong>Favorito:</strong> {card.favorito}
        </p>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            removeCard(card.id);
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardItem;
