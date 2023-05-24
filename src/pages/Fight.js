import { useParams } from "react-router-dom";
import { getPokemonById } from "../utils/PokeAPI";
import { useEffect, useState } from "react";

export default function Fight() {
  const [myPokemon, setMyPokemon] = useState({});
  const [enemyPokemon, setEnemyPokemon] = useState({});
  const { id } = useParams();
  const rndID = Math.floor(
    Math.random() * ProcessingInstruction.env.POKEMON_MAX + 1
  );

  async function loadPokemon() {
    let myP = await getPokemonById(id);
    let enP = await getPokemonById(rndID);
    setMyPokemon(myP);
    setEnemyPokemon(enP);
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  return <div className="fightPage"></div>;
}
