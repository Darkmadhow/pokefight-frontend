import React from 'react';
import { useParams } from 'react-router-dom';
import './PokemonProfile.css';

function PokemonProfile() {
  const { id } = useParams();
  const handleChoose = () => {
    console.log('Pokemon chosen!');
  };
  const handleQuestion = () => {
    console.log('Legend for Icons');
  };

  return (
    <div className="card">
        <button onClick={handleChoose}>←</button>
      <h2 className="pokemon-name">Pokemon Name {id}</h2>
      <div className="pokemon-icons">
        <span className="icon lightning-icon"></span>
        <span className="icon fire-icon"></span>
      </div>
      <div className="pokemon-details">
        <p className="legend">Strengths</p>
        <p className="legend">Ability</p>
        <ul>
          <li><span className="icon lightning-icon"></span> - Electric Type</li>
          <li><span className="icon fire-icon"></span> - Fire Type</li>
        </ul>
      </div>
      <button onClick={handleChoose}>←</button>
      <button onClick={handleChoose}>I choose you!</button>
      <button onClick={handleChoose}>?</button>
    </div>
  );
}

export default PokemonProfile;
