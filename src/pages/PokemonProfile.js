import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPokemonImages from "../utils/ImageAPI";
import "./PokemonProfile.css";

function PokemonProfile() {
  const [pokemonImage, setPokemonImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const lowercaseName = id.charAt(0).toLowerCase() + id.slice(1);
        const image = await getPokemonImages(lowercaseName);
        setPokemonImage(image);
      } catch (error) {
        console.log(error.message);
        setPokemonImage(null);
      }
    };

    fetchPokemonImage();
  }, [id]);

  const handleChoose = () => {
    console.log("Pokemon chosen!");
  };
  const handleQuestion = () => {
    console.log("Legend for Icons");
  };

  return (
    <div className="card">
      <button onClick={handleChoose}>←</button>
      <h2 className="pokemon-name">Pokemon Name {id}</h2>
      <div className="pokemon-image">
        {pokemonImage && (
          <img src={pokemonImage.front_default} alt="Pokemon" width="50%" />
        )}
      </div>
      <div className="pokemon-icons">
        <span className="icon lightning-icon"></span>
        <span className="icon fire-icon"></span>
      </div>
      <div className="pokemon-details">
        <p className="legend">Strengths:</p>
        <ul>
          <li>
            <span className="icon lightning-icon"></span> - Electric Type
          </li>
          <li>
            <span className="icon fire-icon"></span> - Fire Type
          </li>
        </ul>
        <p className="legend">Weekness:</p>
      </div>
      <button onClick={handleChoose}>←</button>
      <button onClick={handleChoose}>I choose you!</button>
      <button onClick={handleChoose}>?</button>
    </div>
  );
}

export default PokemonProfile;
