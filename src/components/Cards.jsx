import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link
      to={`/${pokemon.id}`}
      className={`p-4 rounded shadow-md ${
        pokemon.types ? typeColors[pokemon.types[0].type.name][0] : ""
      } m-2 h-full grid grid-cols-2 hover:scale-105 hover:shadow-lg`}
    >
      {pokemon ? (
        <>
          <div className="flex-grow">
            <div className="w-full">
              <p className="text-center text-3xl font-bold text-white">
                #{pokemon.id}
              </p>
              <p className="text-center font-bold text-white">
                {pokemon.name ? capitalizeFirstLetter(pokemon.name) : null}
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
  );
};

export default Cards;
