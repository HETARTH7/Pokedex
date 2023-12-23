import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const infiniteScroll = (data) => {
    const target = data[0];
    if (target.isIntersecting) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return;
    }

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

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
        );
        const newPokemons = response.data.results;
        setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    if (!search) fetchPokemons();
  }, [offset, search]);

  useEffect(() => {
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

  return (
    <div>
      <div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          />
          <input type="submit" className="p-2 bg-blue-500 text-white rounded" />
        </form>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!search
          ? pokemons.map((pokemon, index) => (
              <Cards key={index} data={pokemon} />
            ))
          : pokemons.map((pokemon, index) => {
              return (
                <div key={index}>
                  {pokemon ? (
                    <div>
                      {pokemon.id ? (
                        <img
                          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                          alt=""
                          className="mx-auto"
                        />
                      ) : null}
                      <p className="text-center text-lg font-bold">
                        {pokemon.id}
                      </p>
                      <p className="text-center">{pokemon.name}</p>
                      {pokemon.types ? (
                        <div className="flex justify-center">
                          {pokemon.types.map((type, index) => (
                            <p
                              key={index}
                              className="mr-2 p-2 bg-gray-200 rounded"
                            >
                              {type.type.name}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
      </ul>
      {loading && <p>Loading...</p>}
      <div id="intersectionTarget" style={{ height: "10px" }}></div>
    </div>
  );
};

export default Pokemons;
