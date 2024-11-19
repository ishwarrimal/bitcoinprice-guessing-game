import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameInterface from './pages/GameInterface';

function App() {
  return (
    <div className="App">
      <h1 className="title">Bitcoin Price Guessing Game</h1>
      <GameInterface />
    </div>
  );
}

export default App;
