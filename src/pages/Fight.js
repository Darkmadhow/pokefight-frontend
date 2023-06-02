import { useNavigate, useParams } from "react-router-dom";
import { getPokemonById } from "../utils/PokeAPI";
import { useEffect, useRef, useState } from "react";
import getPokemonImages from "../utils/ImageAPI";
import "./Fight.css";
import getStrengthsAndWeaknesses from "../utils/TypeHelper";
import { saveGame } from "../utils/PokeAPI";

export default function Fight() {
  // GAME VARIABLES: My Pokemon, Enemy Pokemon, Round Counter, gameLog
  const [{ myPokemon, myPokemonSprites }, setMyPokemon] = useState({
    undefined,
    undefined,
  });
  const [{ enemyPokemon, enemyPokemonSprites }, setEnemyPokemon] = useState({
    undefined,
    undefined,
  });
  const [round, setRound] = useState(1);
  const [gameLog, setGameLog] = useState("");
  const [gameState, setGameState] = useState({
    fighting: false,
    winner: undefined,
    loser: undefined,
  });
  const bottom = useRef(null);
  const navigate = useNavigate();

  const handleClickResults = () => {
    const { winner, loser } = gameState;
    const victory = gameState.winner.name === myPokemon.name.english;
    const score = victory ? 1100 - 100 * round : 0 - round * 100;
    saveGame({ winner, loser, victory, round, score });
    navigate("/result", {
      state: {
        winner,
        loser,
        round,
        victory,
        score,
      },
    });
  };

  //get Pokemon IDs
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
    setGameLog(
      (prev) => prev + `You encounter a wild ${enemyPokemon.name.english}.\n`
    );
    setGameState({ fighting: true, winner: undefined, loser: undefined });
  }

  function playerAttack() {
    //calculate critchance and damage
    const crit = Math.random() < myPokemon.base.Speed / 200;
    let dmg = crit
      ? myPokemon.base.Attack * 2 - enemyPokemon.base.Defense
      : myPokemon.base.Attack - enemyPokemon.base.Defense;
    //if pokemon is too weak, deal minimal damage
    if (dmg <= 0) dmg = 2;
    let HP = enemyPokemon.base.HP - dmg;
    //if the target dies, don't overkill, end the fight
    if (HP <= 0) {
      HP = 0;
      setGameState({
        fighting: false,
        winner: {
          name: myPokemon.name.english,
          image: myPokemonSprites?.other["official-artwork"]?.front_default,
        },
        loser: {
          name: enemyPokemon.name.english,
          image: enemyPokemonSprites?.other["official-artwork"]?.front_default,
        },
      });
    }
    const base = { ...enemyPokemon.base, HP };
    //re-render to advance gamestate
    setEnemyPokemon({
      enemyPokemon: { ...enemyPokemon, base },
      enemyPokemonSprites: { ...enemyPokemonSprites },
    });
    setGameLog(
      (prev) =>
        prev +
        `${crit ? "Critical Hit! " : ""}${
          myPokemon.name.english
        } attacks and deals ${dmg} Damage.\n`
    );
  }

  function enemyAttack() {
    //calculate critchance and damage
    const crit = Math.random() < enemyPokemon.base.Speed / 200;
    let dmg = crit
      ? enemyPokemon.base.Attack * 2 - myPokemon.base.Defense
      : enemyPokemon.base.Attack - myPokemon.base.Defense;
    //if pokemon is too weak, deal minimal damage
    if (dmg <= 0) dmg = 2;
    let HP = myPokemon.base.HP - dmg;
    //if the target dies, don't overkill, end the fight
    if (HP <= 0) {
      HP = 0;
      setGameState({
        fighting: false,
        winner: {
          name: enemyPokemon.name.english,
          image: enemyPokemonSprites?.other["official-artwork"]?.front_default,
        },
        loser: {
          name: myPokemon.name.english,
          image: myPokemonSprites?.other["official-artwork"]?.front_default,
        },
      });
    }
    const base = { ...myPokemon.base, HP };
    //re-render to advance gamestate
    setMyPokemon({
      myPokemon: { ...myPokemon, base },
      myPokemonSprites: { ...myPokemonSprites },
    });
    setGameLog(
      (prev) =>
        prev +
        `${crit ? "Critical Hit! " : ""}${
          enemyPokemon.name.english
        } attacks and deals ${dmg} Damage.\n`
    );
  }

  function playerSpecial() {
    //calculate critchance and damage
    const crit = Math.random() < myPokemon.base.Speed / 200;
    let specialdmg = crit
      ? myPokemon.base["Sp. Attack"] * myPokemon.specialMult * 2 -
        enemyPokemon.base["Sp. Defense"]
      : myPokemon.base["Sp. Attack"] * myPokemon.specialMult -
        enemyPokemon.base["Sp. Defense"];
    //if pokemon is too weak, deal minimal damage
    if (specialdmg <= 0) specialdmg = 2;
    let HP = enemyPokemon.base.HP - specialdmg;
    //if the target dies, don't overkill, end the fight
    if (HP <= 0) {
      HP = 0;
      setGameState({
        fighting: false,
        winner: {
          name: myPokemon.name.english,
          image: myPokemonSprites?.other["official-artwork"]?.front_default,
        },
        loser: {
          name: enemyPokemon.name.english,
          image: enemyPokemonSprites?.other["official-artwork"]?.front_default,
        },
      });
    }
    const base = { ...enemyPokemon.base, HP };
    //re-render to advance gamestate
    setEnemyPokemon({
      enemyPokemon: { ...enemyPokemon, base },
      enemyPokemonSprites: { ...enemyPokemonSprites },
    });
    let effectiveness;
    switch (myPokemon.specialMult) {
      case 0.5:
        effectiveness = " It is not very effective.";
        break;
      case 2:
        effectiveness = " It is super effective!";
        break;
      default:
        effectiveness = "";
    }
    setGameLog(
      (prev) =>
        prev +
        `${crit ? "Critical Hit! " : ""}${
          myPokemon.name.english
        } uses its Special.${effectiveness} It deals ${specialdmg} Damage.\n`
    );
  }

  function enemySpecial() {
    //calculate critchance and damage
    const crit = Math.random() < enemyPokemon.base.Speed / 200;
    let specialdmg = crit
      ? enemyPokemon.base["Sp. Attack"] * enemyPokemon.specialMult * 2 -
        myPokemon.base["Sp. Defense"]
      : enemyPokemon.base["Sp. Attack"] * enemyPokemon.specialMult -
        myPokemon.base["Sp. Defense"];
    //if pokemon is too weak, deal minimal damage
    if (specialdmg <= 0) specialdmg = 2;
    let HP = myPokemon.base.HP - specialdmg;
    //if the target dies, don't overkill, end the fight
    if (HP <= 0) {
      HP = 0;
      setGameState({
        fighting: false,
        winner: {
          name: enemyPokemon.name.english,
          image: enemyPokemonSprites?.other["official-artwork"]?.front_default,
        },
        loser: {
          name: myPokemon.name.english,
          image: myPokemonSprites?.other["official-artwork"]?.front_default,
        },
      });
    }
    const base = { ...myPokemon.base, HP };
    //re-render to advance gamestate
    setMyPokemon({
      myPokemon: { ...myPokemon, base },
      myPokemonSprites: { ...myPokemonSprites },
    });
    let effectiveness;
    switch (enemyPokemon.specialMult) {
      case 0.5:
        effectiveness = " It is not very effective.";
        break;
      case 2:
        effectiveness = " It is super effective!";
        break;
      default:
        effectiveness = "";
    }
    setGameLog(
      (prev) =>
        prev +
        `${crit ? "Critical Hit! " : ""}${
          enemyPokemon.name.english
        } uses its Special.${effectiveness} It deals ${specialdmg} Damage.\n`
    );
  }

  // function playerEvade() {}

  function fightRound(playerChoice) {
    //what does the player do? 0 = attack, 1 = special
    const playerMove = playerChoice ? playerSpecial : playerAttack;
    //What does the enemy do?
    let enemyMove =
      Math.floor(Math.random() * 3) < 2 ? enemyAttack : enemySpecial;
    //decide who goes first and fight!
    if (myPokemon.base.Speed > enemyPokemon.base.Speed) {
      playerMove();
      if (enemyPokemon.base.HP > 0) enemyMove();
    } else {
      enemyMove();
      if (myPokemon.base.HP > 0) playerMove();
    }
    //advance round counter
    setRound((prev) => prev + 1);
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    //scroll to bottom every time messages change
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [gameLog]);

  function replaceWithBr() {
    return gameLog.replace(/\n/g, "<br />");
  }

  return (
    <div className="fightPage">
      <div className="battlefield">
        <div className="enemyPokeStats">
          <h4>{enemyPokemon?.name.english}</h4>
          {enemyPokemon?.base.HP} HP
        </div>
        <div className="enemyPokeSprite">
          <img
            src={
              enemyPokemonSprites?.front_default ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            }
            alt={enemyPokemon?.name.english}
          />
        </div>
        <div className="myPokeSprite">
          <img
            src={
              myPokemonSprites?.back_default ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
            }
            alt={myPokemon?.name.english}
          />
        </div>
        <div className="myPokeStats">
          <h4>{myPokemon?.name.english}</h4>
          {myPokemon?.base.HP}HP
        </div>
      </div>
      {gameState.fighting ? ( //If pokemon are loaded and ready, display actionbuttons to control pokemon
        <div className="playerActions">
          <button
            onClick={
              enemyPokemon
                ? () => {
                    fightRound(0);
                  }
                : null
            }
          >
            Attack!
          </button>
          <button
            onClick={
              enemyPokemon
                ? () => {
                    fightRound(1);
                  }
                : null
            }
          >
            Use Special!
          </button>
          <div className="counter">Round: {round}</div>
          {/* <button onClick={enemyPokemon ? playerEvade : null}>Evade!</button> */}
        </div>
      ) : (
        //If pokemon are not loaded or the fight is over, display next button
        <div className="playerActions">
          <button onClick={enemyPokemon ? handleClickResults : null}>
            View Result
          </button>
        </div>
      )}

      <div className="gameLog">
        <p dangerouslySetInnerHTML={{ __html: replaceWithBr() }} />
        <div ref={bottom} />
      </div>
    </div>
  );
}
