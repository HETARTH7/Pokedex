import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cards = (props) => {
  const url = props.data.url;
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
    <div className="bg-white p-4 rounded shadow-md">
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
                <p key={index} className="mr-2 p-2 bg-gray-200 rounded">
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
