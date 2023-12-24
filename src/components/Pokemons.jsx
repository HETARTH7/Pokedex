import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import typeColors from "../color.json";

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
    if (!search) fetchPokemons();
  }, [offset, search, selectedTypeFilter]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
              className="border border-gray-300 rounded-full p-2 mb-2 hover:scale-105 hover:shadow-lg"
            />
            <select
              value={selectedTypeFilter}
              onChange={handleTypeFilterChange}
              className="p-2 mb-2"
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
              <Link
                key={index}
                to={`/${pokemon.id}`}
                className={`p-4 rounded shadow-md ${
                  pokemon.types ? typeColors[pokemon.types[0].type.name][0] : ""
                } h-full grid grid-cols-2 hover:scale-105 hover:shadow-lg`}
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
                                    ? typeColors[pokemon.types[0].type.name][1]
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
            ))}
      </ul>
      {loading && <p>Loading...</p>}
      <div id="intersectionTarget" style={{ height: "10px" }}></div>
    </div>
  );
};

export default Pokemons;
