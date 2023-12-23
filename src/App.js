import React from "react";
import Pokemons from "./components/Pokemons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokemon from "./components/Pokemon";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/:id" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
