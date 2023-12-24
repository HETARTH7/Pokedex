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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center bg-slate-200 h-screen">
      {pokemon ? (
        <>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            alt=""
            className="mx-auto mb-4 md:mb-0 w-full md:w-1/3"
          />
          <div className="flex-grow text-center md:text-left">
            <p className="text-6xl font-bold mb-8">
              {pokemon.id}.{" "}
              {pokemon.name ? capitalizeFirstLetter(pokemon.name) : null}
            </p>
            {pokemon.stats
              ? pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="w-1/3">
                      {stat.stat.name
                        ? capitalizeFirstLetter(stat.stat.name)
                        : null}
                      :
                    </p>
                    <div className="h-4 text-xs leading-none py-1 text-center w-1/6">
                      {stat.base_stat}
                    </div>
                    <div
                      className="w-2/3 bg-gray-200 rounded overflow-hidden ml-3 max-[500px]:w-36"
                      style={{
                        // width: "100px",
                        height: "20px",
                        background: `linear-gradient(90deg, #3182ce ${
                          (stat.base_stat / 150) * 100
                        }%, #edf2f7 ${(stat.base_stat / 150) * 100}%)`,
                      }}
                    ></div>
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
