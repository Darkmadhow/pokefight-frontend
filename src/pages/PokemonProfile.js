import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getPokemonImages from "../utils/ImageAPI";
import getStrengthsAndWeaknesses, {
  getColorByType,
  getIconByType,
} from "../utils/TypeHelper";
import "./PokemonProfile.css";
import { getPokemonById } from "../utils/PokeAPI";
import healthIcon from "../icons/Health.png";
import speedIcon from "../icons/Speed.png";
import attackIcon from "../icons/Attack.png";
import specialIcon from "../icons/Special.png";
import defenseIcon from "../icons/Defense.png";
import specialdefenseIcon from "../icons/Specialdefense.png";

function PokemonProfile() {
  const [pokemonImages, setPokemonImages] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [typeIcons, setTypeIcons] = useState([]);
  const { id } = useParams();
  const [displayLegend, setDisplayLegend] = useState("hidden");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemon = await getPokemonById(id);
        const images = await getPokemonImages(pokemon.name.english);
        const typeIcons = pokemon.type.map((type) => getIconByType(type));
        setPokemonImages(images);
        setPokemon(pokemon);
        setTypeIcons(typeIcons);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleChoose = () => {
    navigate(`/fight/${pokemon.id}`);
  };
  const handleReturn = () => {
    navigate("/");
  };

  const toggleLegend = () => {
    if (displayLegend === "hidden") setDisplayLegend("visible");
    else setDisplayLegend("hidden");
  };

  return (
    <div className="pokemonProfilePage">
      <div className="card">
        <div className="cardBody" style={getColorByType(pokemon?.type[0])}>
          <div className="pokemonHeader">
            <h2 className="pokemon-name">{pokemon?.name.english}</h2>
            <div className="pokemonTypeIcons">
              {typeIcons.map((icon, index) => (
                <img src={icon} alt={pokemon?.type[index]} />
              ))}
            </div>
          </div>
          <div
            className="pokemon-image"
            style={getColorByType(pokemon?.type[1])}
          >
            {pokemonImages && (
              <img
                src={
                  pokemonImages?.other["official-artwork"]?.front_default ||
                  pokemonImages?.front_default
                }
                alt={pokemon?.name.english}
              />
            )}
          </div>
          <div className="pokemon-types">
            {pokemon?.type.map((type) => (
              <h4>{type}</h4>
            ))}
            <span className="legend" style={{ visibility: displayLegend }}>
              This pokemons types - primary and secondary
            </span>
          </div>
          <div className="pokemon-details">
            <p className="strengths">
              <b>Strengths: </b>
              {pokemon
                ? getStrengthsAndWeaknesses(pokemon.type)[0].toString()
                : ""}
              <span className="legend" style={{ visibility: displayLegend }}>
                Takes halved damage from these types
              </span>
            </p>
            <div className="pokemonStats">
              <div className="stat">
                <img src={healthIcon} alt="HP" />
                <span>{pokemon?.base.HP}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Health
                </span>
              </div>
              <div className="stat">
                <img src={speedIcon} alt="Spd" />
                <span>{pokemon?.base.Speed}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Speed
                </span>
              </div>
              <div className="stat">
                <img src={attackIcon} alt="Atk" />
                <span>{pokemon?.base.Attack}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Attack
                </span>
              </div>
              <div className="stat">
                <img src={defenseIcon} alt="Def" />
                <span>{pokemon?.base.Defense}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Defense
                </span>
              </div>
              <div className="stat">
                <img src={specialIcon} alt="Spc" />
                <span>{pokemon?.base["Sp. Attack"]}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Special Attack
                </span>
              </div>
              <div className="stat">
                <img src={specialdefenseIcon} alt="Spc Def" />
                <span>{pokemon?.base["Sp. Defense"]}</span>
                <span className="legend" style={{ visibility: displayLegend }}>
                  Special Defense
                </span>
              </div>
            </div>
            <p className="weaknesses">
              <b>Weaknesses: </b>
              {pokemon
                ? getStrengthsAndWeaknesses(pokemon.type)[1].toString()
                : ""}
              <span className="legend" style={{ visibility: displayLegend }}>
                Takes double damage from these types
              </span>
            </p>
          </div>
          <div className="buttonBox">
            <button onClick={handleReturn}>←</button>
            <button onClick={handleChoose}>I choose you!</button>
            <button onClick={toggleLegend}>?</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonProfile;
