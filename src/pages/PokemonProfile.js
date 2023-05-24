import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonProfile() {
  const { id } = useParams();

  return (
    <div className="card">
      <h2 className="pokemon-name">Pokemon Name {id}</h2>
      <div className="pokemon-icons">
        <span className="icon lightning-icon"></span>
        <span className="icon fire-icon"></span>
      </div>
      <div className="pokemon-details">
        <p className="legend">Legend for Icons:</p>
        <ul>
          <li><span className="icon lightning-icon"></span> - Electric Type</li>
          <li><span className="icon fire-icon"></span> - Fire Type</li>
        </ul>
      </div>
    </div>
  );
}

export default PokemonProfile;
