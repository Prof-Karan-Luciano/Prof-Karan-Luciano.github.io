/**
 * Componente principal da aplicação.
 *
 * @component
 * @returns {JSX.Element} Componente App com roteamento e estado de cartões.
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import CardList from './components/CardList';

function App() {
  const [cards, setCards] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form setCards={setCards} />} />
        <Route path="/cards" element={<CardList cards={cards} setCards={setCards} />} />
      </Routes>
    </Router>
  );
}

export default App;
