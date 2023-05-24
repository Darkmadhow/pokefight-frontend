import { useParams } from "react-router-dom";
import { getPokemonById } from "../utils/PokeAPI";

export default function Fight() {
  const { id } = useParams();
  const myPokemon = getPokemonById(id);
  const rndID = Math.floor(
    Math.random() * ProcessingInstruction.env.POKEMON_MAX + 1
  );
  const enemyPokemon = getPokemonById(rndID);

  return <div className="fightPage"></div>;
}
