import "./AllPokemons.css";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AllPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, searchQuery, selectedType]);

  const fetchPokemons = async () => {
    try {
      const limit = 9;
      let url = "https://pokeapi.co/api/v2/pokemon?limit=2000";
      let totalCount = 0;
      let results = [];

      if (selectedType.trim() !== "") {
        url = `https://pokeapi.co/api/v2/type/${selectedType.toLowerCase()}`;
        const response = await fetch(url);
        const data = await response.json();
        totalCount = data.pokemon.length;
        results = data.pokemon.map((entry) => entry.pokemon);
      } else if (searchQuery.trim() !== "") {
        const response = await fetch(url);
        const data = await response.json();
        results = data.results.filter((pokemon) =>
          pokemon.name.startsWith(searchQuery.toLowerCase())
        );
        totalCount = results.length;
      } else {
        const response = await fetch(url);
        const data = await response.json();
        results = data.results;
        totalCount = data.count;
      }

      const paginatedResults = results.slice(
        (currentPage - 1) * limit,
        currentPage * limit
      );

      // Fetch and include the image URLs for each Pokémon
      const pokemonsWithImages = await Promise.all(
        paginatedResults.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return {
            id: data.id,
            name: pokemon.name,
            imageUrl: data.sprites.front_default,
          };
        })
      );

      setPokemons(pokemonsWithImages);
      setTotalPages(Math.ceil(totalCount / limit));
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

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
    setSearchQuery("");
  };

  return (
    <div className="all-pokemons-wrapper">
      <h1>Pokémon</h1>
      <div>
        <span className="filter-label">Filter:</span>
        <select
          className="pokeselect"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          {/* Add more type options as needed */}
        </select>
        <input
          className="pokesearch"
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={handleSearch}
        />
        <FontAwesomeIcon
          className="searchicon"
          icon={faMagnifyingGlass}
          size="2x"
        />
      </div>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className="pokemon-card"
          >
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <span>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </span>
          </Link>
        ))}
      </div>
      <div>
        <button
          className="pagebutton"
          style={{ cursor: "pointer" }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagebutton"
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
