import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import NavBar from "./components/NavBar";
import PokemonProfile from "./pages/PokemonProfile.js";
import Fight from "./pages/Fight";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonProfile />} />
        <Route path="/fight/:id" element={<Fight />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
