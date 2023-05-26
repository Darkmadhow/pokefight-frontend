import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="NavBar">
      <span className="pokefighth1">PokeFight</span>
      <NavLink to="/leaderboard">
        <span className="ldboard">Leaderboard</span>
      </NavLink>
    </div>
  );
}
