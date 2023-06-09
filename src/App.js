import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import PokemonProfile from "./pages/PokemonProfile.js";
import Fight from "./pages/Fight";
import Leaderboard from "./pages/Leaderboard";
import FightResult from "./pages/FightResult";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonProfile />} />
        <Route path="/fight/:id" element={<Fight />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/result" element={<FightResult />} />
      </Routes>
    </div>
  );
}

export default App;
