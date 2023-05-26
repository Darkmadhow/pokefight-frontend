import AllPokemons from "../components/AllPokemons";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div className="home-main">
      <NavBar />
      <AllPokemons />
    </div>
  );
}

export default Home;
