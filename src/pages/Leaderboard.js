import { NavLink } from "react-router-dom";
import "./Leaderboard.css";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../utils/PokeAPI";
import FightRecord from "../components/FightRecord";

export default function Leaderboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const scores = await getLeaderboard();
      setRecords(scores);
    })();
  }, []);

  return (
    <div className="leaderboardPage">
      <nav className="leaderboardNav">
        <span className="pokefighth1">PokeFight</span>
        <NavLink to="/">
          <span className="linkHome">Back</span>
        </NavLink>
      </nav>
      <h2>Fight History</h2>
      <div className="leaderboard">
        <ul>
          {records?.map((record) => (
            <FightRecord fightInfo={record} key={record.winner.name} />
          ))}
        </ul>
      </div>
    </div>
  );
}
