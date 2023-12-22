import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const infiniteScroll = (data) => {
    const target = data[0];
    if (target.isIntersecting) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      const foundPokemon = response.data;
      setPokemons([foundPokemon]);
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
    fetchPokemons();
  }, [offset]);

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
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      <div id="intersectionTarget" style={{ height: "10px" }}></div>
    </div>
  );
};

export default Pokemons;
