import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const typeColors = {
  normal: ["bg-gray-300", "bg-gray-300"],
  fighting: ["bg-red-600", "bg-red-300"],
  flying: ["bg-blue-400", "bg-blue-300"],
  poison: ["bg-purple-600", "bg-purple-300"],
  ground: ["bg-yellow-800", "bg-yellow-300"],
  rock: ["bg-yellow-600", "bg-yellow-300"],
  bug: ["bg-green-500", "bg-green-300"],
  ghost: ["bg-indigo-500", "bg-indigo-300"],
  steel: ["bg-gray-500", "bg-gray-300"],
  fire: ["bg-red-500", "bg-red-300"],
  water: ["bg-blue-500", "bg-blue-300"],
  grass: ["bg-green-400", "bg-green-300"],
  electric: ["bg-yellow-400", "bg-yellow-300"],
  psychic: ["bg-purple-500", "bg-purple-300"],
  ice: ["bg-blue-200", "bg-blue-300"],
  dragon: ["bg-indigo-800", "bg-indigo-300"],
  dark: ["bg-gray-800", "bg-gray-300"],
  fairy: ["bg-pink-300", "bg-pink-300"],
  unknown: ["bg-gray-400", "bg-gray-300"],
  shadow: ["bg-black", "bg-black"],
};

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");
  const { theme, toggleTheme } = useAppContext();
  const { backgroundColor, textColor } = useAppContext().getThemeColors();

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
        alert("Error fetching Pokemon data:", error);
      }
    };
    if (!search) fetchPokemons();
  }, [offset, search, selectedTypeFilter]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={{ backgroundColor, color: textColor }}>
      <button onClick={toggleTheme}>
        <img
          src={theme === "light" ? "/dark.png" : "/light.png"}
          alt=""
          width={"50px"}
          height={"50px"}
        />
      </button>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch} className="text-center mt-2">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border border-gray-300 rounded-full p-2 mb-2 hover:scale-105 hover:shadow-lg ${
                theme === "dark" ? "bg-black" : ""
              }`}
            />
            <select
              value={selectedTypeFilter}
              onChange={handleTypeFilterChange}
              className={`p-2 mb-2 ${theme === "dark" ? "bg-black" : ""}`}
            >
              <option hidden={true} value="">
                Filter
              </option>
              {filters.map((filter, index) => (
                <option key={index} value={filter.url}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 border-2 rounded-full mb-2 hover:bg-emerald-100"
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
              <div key={index} className="h-screen m-2">
                <Link
                  to={`/${pokemon.id}`}
                  className={`p-4 rounded shadow-md ${
                    pokemon.types
                      ? typeColors[pokemon.types[0].type.name][0]
                      : ""
                  } grid grid-cols-2 hover:scale-105 hover:shadow-lg`}
                >
                  {pokemon ? (
                    <>
                      <div className="flex-grow">
                        <div className="w-full">
                          <p className="text-center text-3xl font-bold text-white">
                            #{pokemon.id}
                          </p>
                          <p className="text-center font-bold text-white">
                            {pokemon.name
                              ? capitalizeFirstLetter(pokemon.name)
                              : null}
                          </p>
                          {pokemon.types ? (
                            <div className="flex justify-center">
                              {pokemon.types.map((type, index) => (
                                <p
                                  key={index}
                                  className={`m-2 p-1 rounded text-white ${
                                    pokemon.types
                                      ? typeColors[
                                          pokemon.types[0].type.name
                                        ][1]
                                      : ""
                                  }`}
                                >
                                  {capitalizeFirstLetter(type.type.name)}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        {pokemon.id ? (
                          <img
                            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                            alt=""
                            className="mx-auto object-cover h-36 w-38"
                          />
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </Link>
              </div>
            ))}
      </ul>
      {loading && <p>Loading...</p>}
      <div id="intersectionTarget" style={{ height: "10px" }}></div>
    </div>
  );
};

export default Pokemons;
