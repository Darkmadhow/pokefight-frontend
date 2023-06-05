import { Link, Navigate, useLocation } from "react-router-dom";
import "./FightResult.css";

export default function FightResult(props) {
  let location = useLocation();
  if (!location.state) return <Navigate to="/" />;
  const { winner, loser, round, victory, score } = location.state;

  return (
    <div className="resultPage">
      <div className="resultWrapper">
        {victory ? (
          <div className="resultConditional">
            <div className="crownContainer">
              <img src="Victory.png" alt="Victory" />
            </div>
            <h1>Victory!</h1>
          </div>
        ) : (
          <div className="resultConditional">
            <h1>Defeat</h1>
          </div>
        )}
        <div className="result">
          <img src={winner.image} alt={winner.name} />
          <h3>{winner.name}</h3>
          <p>defeated</p>
          <h3>{loser.name}</h3>
          <img src={loser.image} alt={loser.name} />
        </div>
        <p>in {round - 1} rounds.</p>
        <h4>Score: {score}</h4>
        <Link to="/">
          <button>Return to Pokedex</button>
        </Link>
      </div>
    </div>
  );
}
