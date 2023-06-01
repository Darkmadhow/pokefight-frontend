import "./AllPokemons.css";
import { useEffect, useState } from "react";

export default function AllPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, searchQuery]);

  const fetchPokemons = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${
        (currentPage - 1) * 9
      }`;

      if (searchQuery.trim() !== "") {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );
        const data = await response.json();
        const filteredPokemons = data.results.filter((pokemon) =>
          pokemon.name.startsWith(searchQuery.toLowerCase())
        );
        setPokemons(filteredPokemons);
        setTotalPages(Math.ceil(filteredPokemons.length / 9));
      } else {
        const response = await fetch(url);
        const data = await response.json();
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / 9));
      }
    } catch (error) {
      console.log("Error fetching pokemons:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when a new search query is entered
  };

  return (
    <div>
      <h1>All Pokemons</h1>
      <div>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <div>
        <button
          className="ldboard"
          style={{ cursor: "pointer" }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ldboard"
          style={{ cursor: "pointer" }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
