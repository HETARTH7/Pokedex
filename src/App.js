import React from "react";
import Pokemons from "./components/Pokemons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pokemons />} />
            <Route path="/:id" element={<Pokemon />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
};

export default App;
