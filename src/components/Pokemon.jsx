import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const foundPokemon = response.data;
        setPokemon(foundPokemon);
      } catch (error) {
        alert("Pokemon not found. Try again");
        setPokemon([]);
      }
    };
    if (id) fetchPokemon();
  }, [id]);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center">
      {pokemon ? (
        <>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            alt=""
            className="mx-auto md:mr-8 mb-4 md:mb-0 w-48 md:w-auto"
          />
          <div className="flex-grow text-center md:text-left">
            <p className="text-2xl font-bold mb-2">
              {pokemon.id}. {pokemon.name}
            </p>
            {pokemon.stats
              ? pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="w-1/3">{stat.stat.name}:</p>
                    <div className="w-2/3 bg-gray-200 rounded overflow-hidden">
                      <div
                        className={`bg-blue-500 h-4 text-xs leading-none py-1 text-center text-white w-[${stat.base_stat}px]`}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Pokemon;
