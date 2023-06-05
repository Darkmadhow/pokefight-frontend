import "./FightRecord.css";

export default function FightRecord({ fightInfo }) {
  const formattedDate = new Date(fightInfo?.timestamp).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }
  );

  const formattedTime = new Date(fightInfo?.timestamp).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <div className="fightRecordWrapper">
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
      <small>{formattedDateTime}</small>
    </div>
  );
}
