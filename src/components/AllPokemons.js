import "./AllPokemons.css";
import { useEffect, useState } from "react";

export default function AllPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${
          (currentPage - 1) * 9
        }`
      );
      const data = await response.json();
      setPokemons(data.results);
      setTotalPages(Math.ceil(data.count / 9));
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

  return (
    <div>
      <h1>All Pokemons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <div>
        <button
          className="ldboard"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ldboard"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
