import { useParams } from "react-router-dom";
import { getPokemonById } from "../utils/PokeAPI";
import { useEffect, useState } from "react";
import getPokemonImages from "../utils/ImageAPI";
import "./Fight.css";

export default function Fight() {
  console.log(
    "Maximum amount of Pokemon is ",
    process.env.REACT_APP_POKEMON_MAX
  );
  const [{ myPokemon, myPokemonSprites }, setMyPokemon] = useState({
    undefined,
    undefined,
  });
  const [{ enemyPokemon, enemyPokemonSprites }, setEnemyPokemon] = useState({
    undefined,
    undefined,
  });
  const { id } = useParams();
  const rndID = Math.floor(
    Math.random() * process.env.REACT_APP_POKEMON_MAX + 1
  );

  async function loadPokemon() {
    const myPokemon = await getPokemonById(id);
    const enemyPokemon = await getPokemonById(rndID);
    const myPokemonSprites = await getPokemonImages(myPokemon.name.english);
    const enemyPokemonSprites = await getPokemonImages(
      enemyPokemon.name.english
    );
    setMyPokemon({ myPokemon, myPokemonSprites });
    setEnemyPokemon({ enemyPokemon, enemyPokemonSprites });
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div className="fightPage">
      <div className="battlefield">
        <div className="enemyPokeStats">{enemyPokemon?.base.HP}</div>
        <div className="enemyPokeSprite">
          <img
            src={enemyPokemonSprites?.front_default}
            alt={enemyPokemon?.name.english}
          />
        </div>
        <div className="myPokeSprite">
          <img
            src={myPokemonSprites?.back_default}
            alt={myPokemon?.name.english}
          />
        </div>
        <div className="myPokeStats">{myPokemon?.base.HP}</div>
      </div>
    </div>
  );
}
