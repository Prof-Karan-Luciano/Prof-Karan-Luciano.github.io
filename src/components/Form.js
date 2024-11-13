// src/components/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function Form({ setCards }) {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [foto, setFoto] = useState(null);
  const [favorito, setFavorito] = useState('');
  const navigate = useNavigate();

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoCard = {
      id: Date.now(),
      nome,
      cargo,
      foto,
      favorito,
    };
    setCards((prevCards) => [...prevCards, novoCard]);
    navigate('/cards');
  };

  return (
    <div className="form-container">
      <h1>Crie Seu Card</h1>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cargo:</label>
          <input
            type="text"
            placeholder="Seu cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Foto:</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} required />
        </div>
        <div className="form-group">
          <label>Time ou Anime Favorito:</label>
          <input
            type="text"
            placeholder="Seu time ou anime favorito"
            value={favorito}
            onChange={(e) => setFavorito(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Card</button>
      </form>
    </div>
  );
}

export default Form;
