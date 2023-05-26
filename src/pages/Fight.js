import { useParams } from "react-router-dom";
import { getPokemonById } from "../utils/PokeAPI";
import { useEffect, useState } from "react";
import getPokemonImages from "../utils/ImageAPI";
import "./Fight.css";
import getStrengthsAndWeaknesses from "../utils/TypeHelper";

export default function Fight() {
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
    //load my Pokemon info
    let myPokemon = await getPokemonById(id);
    const myStrsAndWeaks = getStrengthsAndWeaknesses(myPokemon.type);
    const myPokemonSprites = await getPokemonImages(myPokemon.name.english);

    //load enemy Pokemon info
    let enemyPokemon = await getPokemonById(rndID);
    const enemyStrsAndWeaks = getStrengthsAndWeaknesses(enemyPokemon.type);
    const enemyPokemonSprites = await getPokemonImages(
      enemyPokemon.name.english
    );

    let mySpecialMult = 1;
    //if enemy is weak against my primary type, deal double special damage
    if (enemyStrsAndWeaks[1].includes(myPokemon.type[0])) {
      mySpecialMult = 2;
    }
    //if enemy is strong against my primary type, deal half damage
    else if (enemyStrsAndWeaks[0].includes(myPokemon.type[0])) {
      mySpecialMult = 0.5;
    }

    let enemySpecialMult = 1;
    //if i am weak against enemies primary type, he deals double damage
    if (myStrsAndWeaks[1].includes(enemyPokemon.type[0])) {
      enemySpecialMult = 2;
    }
    //if enemy is strong against my primary type, deal half damage
    else if (myStrsAndWeaks[0].includes(enemyPokemon.type[0])) {
      enemySpecialMult = 0.5;
    }

    //save pokemon in states
    myPokemon.specialMult = mySpecialMult;
    enemyPokemon.specialMult = enemySpecialMult;

    setMyPokemon({ myPokemon, myPokemonSprites });
    setEnemyPokemon({ enemyPokemon, enemyPokemonSprites });
  }

  function playerAttack() {
    const dmg = myPokemon.base.Attack - enemyPokemon.base.Defense;
    //if pokemon is too weak, deal no damage
    if (dmg <= 0) {
      console.log("Your pokemon is too weak, it deals no damage");
    }
    const HP = dmg > 0 ? enemyPokemon.base.HP - dmg : enemyPokemon.base.HP;
    const base = { ...enemyPokemon.base, HP };
    //re-render even without damage dealt to advance gamestate
    setEnemyPokemon({
      enemyPokemon: { ...enemyPokemon, base },
      enemyPokemonSprites: { ...enemyPokemonSprites },
    });
  }

  function playerSpecial() {
    const specialdmg =
      myPokemon.base["Sp. Attack"] * myPokemon.specialMult -
      enemyPokemon.base["Sp. Defense"];
    //if pokemon is too weak, deal no damage
    if (specialdmg <= 0) {
      console.log("Your pokemon uses Special Attack, it deals no damage");
    }
    const HP =
      specialdmg > 0 ? enemyPokemon.base.HP - specialdmg : enemyPokemon.base.HP;
    const base = { ...enemyPokemon.base, HP };
    //re-render even without damage dealt to advance gamestate
    setEnemyPokemon({
      enemyPokemon: { ...enemyPokemon, base },
      enemyPokemonSprites: { ...enemyPokemonSprites },
    });
  }

  function playerEvade() {}

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div className="fightPage">
      <div className="battlefield">
        <div className="enemyPokeStats">
          <h4>{enemyPokemon?.name.english}</h4>
          {enemyPokemon?.base.HP} HP
        </div>
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
        <div className="myPokeStats">
          <h4>{myPokemon?.name.english}</h4>
          {myPokemon?.base.HP}HP
        </div>
      </div>
      <div className="playerActions">
        <button onClick={enemyPokemon ? playerAttack : null}>Attack!</button>
        <button onClick={enemyPokemon ? playerSpecial : null}>
          Use Special!
        </button>
        <button onClick={enemyPokemon ? playerEvade : null}>Evade!</button>
      </div>
      <div className="gameLog"></div>
    </div>
  );
}
