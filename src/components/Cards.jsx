import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const typeColors = {
  normal: "bg-gray-300",
  fighting: "bg-red-600",
  flying: "bg-blue-400",
  poison: "bg-purple-600",
  ground: "bg-yellow-800",
  rock: "bg-yellow-600",
  bug: "bg-green-500",
  ghost: "bg-indigo-500",
  steel: "bg-gray-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-400",
  electric: "bg-yellow-400",
  psychic: "bg-purple-500",
  ice: "bg-blue-200",
  dragon: "bg-indigo-800",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  unknown: "bg-gray-400",
  shadow: "bg-black",
};

const Cards = (props) => {
  const url = props.data.url || props.data.pokemon.url;
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(url);
      const json = await response.data;
      setPokemon(json);
    };
    fetchDetails();
  }, [url]);

  return (
    <div
      className={`p-4 rounded shadow-md ${
        pokemon.types ? typeColors[pokemon.types[0].type.name] : ""
      }`}
    >
      {pokemon ? (
        <Link to={`/${pokemon.id}`}>
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
                <p key={index} className="mr-2 p-2 rounded">
                  {type.type.name}
                </p>
              ))}
            </div>
          ) : null}
        </Link>
      ) : null}
    </div>
  );
};

export default Cards;
