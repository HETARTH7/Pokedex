import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");

  const infiniteScroll = (data) => {
    const target = data[0];
    if (target.isIntersecting) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      const foundPokemon = response.data;
      setPokemons([foundPokemon]);
      setSearch(true);
    } catch (error) {
      alert("Pokemon not found. Try again");
      setPokemons([]);
    }
  };

  const handleTypeFilterChange = (e) => {
    setSelectedTypeFilter(e.target.value);
    setOffset(0);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const json = response.data;
      setFilters(json.results);
    };
    fetchTypes();

    const observer = new IntersectionObserver(infiniteScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const target = document.getElementById("intersectionTarget");
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let url;
        if (selectedTypeFilter) {
          url = `${selectedTypeFilter}`;
        } else {
          url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
        }

        const response = await axios.get(url);
        const newPokemons = selectedTypeFilter
          ? response.data.pokemon
          : response.data.results;
        setPokemons((prevPokemons) =>
          offset === 0 ? newPokemons : [...prevPokemons, ...newPokemons]
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemons();
  }, [offset, selectedTypeFilter]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch} className="text-center mt-2">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-2"
            />
            <select
              value={selectedTypeFilter}
              onChange={handleTypeFilterChange}
              className="border border-gray-300 rounded p-2 mb-2"
            >
              <option value="">Filter by Type</option>
              {filters.map((filter, index) => (
                <option key={index} value={filter.url}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded mb-2"
          >
            Search
          </button>
        </form>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!search
          ? pokemons.map((pokemon, index) => (
              <Cards key={index} data={pokemon} />
            ))
          : pokemons.map((pokemon, index) => (
              <Link key={index} to={`/${pokemon.id}`}>
                <div>
                  {pokemon.id ? (
                    <img
                      src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt=""
                      className="mx-auto"
                    />
                  ) : null}
                  <p className="text-center text-lg font-bold">{pokemon.id}</p>
                  <p className="text-center">{pokemon.name}</p>
                  {pokemon.types ? (
                    <div className="flex justify-center">
                      {pokemon.types.map((type, index) => (
                        <p key={index} className="mr-2 p-2 bg-gray-200 rounded">
                          {type.type.name}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
      </ul>
      {loading && <p>Loading...</p>}
      <div id="intersectionTarget" style={{ height: "10px" }}></div>
    </div>
  );
};

export default Pokemons;
