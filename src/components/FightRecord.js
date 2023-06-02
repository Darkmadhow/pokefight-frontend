import "./FightRecord.css";

export default function FightRecord({ fightInfo }) {
  return (
    <div className="fightRecord">
      <img src={fightInfo.winner.image} alt={fightInfo.winner.name} />
      <h3>{fightInfo.winner.name}</h3>
      <div className="fightResult">
        {fightInfo.victory ? <img src="Victory.png" alt="Victory!" /> : null}
        <div className="fightResultText">
          <h4>defeated</h4>
        </div>
        <small>{fightInfo.victory ? "You won!" : "You lost"}</small>
      </div>
      <h3>{fightInfo.loser.name}</h3>
      <img src={fightInfo.loser.image} alt={fightInfo.loser.name} />
    </div>
  );
}
