import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import typeColors from "../color.json";

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
