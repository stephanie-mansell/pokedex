import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { getAllPokemon, getPokemon } from "./Services/pokemon.js";
import Card from "./components/Card";
import Navbar from "./Navbar";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

  const [searchPoke, setSearchPoke] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const results = pokemonData.filter(
      (poke) =>
        (poke.name.includes(searchPoke.toLowerCase()) ||
          poke.id.toString().includes(searchPoke)) &&
        poke.types[0].type.name.includes(searchType.toLowerCase())
    );

    setSearchResults(results);
  }, [pokemonData, searchPoke, searchType]);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleChange = (event) => {
    setSearchPoke(event.target.value);
  };

  const typeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <h1>Gotta catch 'em all...</h1>
          <img
            src="https://i.pinimg.com/originals/6a/d7/f0/6ad7f0eb6e523bfed542d8b1fd627c0d.gif"
            className="loading-image"
            alt="loading"
          />
        </div>
      ) : (
        <>
          <div className="background-image" />
          <Navbar />
          <div className="btn">
            <button onClick={prev}>PREVIOUS</button>
            <button onClick={next}>NEXT</button>
          </div>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search pokemon name/ID"
              value={searchPoke}
              onChange={handleChange}
              className="search-bar"
            />
            <select type="select" onChange={typeChange} className="types">
              <option value="">Types:</option>
              <option value="">All</option>
              <option value="bug">Bug</option>
              <option value="dragon">Dragon</option>
              <option value="fairy">Fairy</option>
              <option value="fire">Fire</option>
              <option value="ghost">Ghost</option>
              <option value="ground">Ground</option>
              <option value="normal">Normal</option>
              <option value="psychic">Psychic</option>
              <option value="steel">Steel</option>
              <option value="dark">Dark</option>
              <option value="electric">Electric</option>
              <option value="fighting">Fighting</option>
              <option value="flying">Flying</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="poison">Poison</option>
              <option value="rock">Rock</option>
              <option value="water">Water</option>
            </select>
          </div>

          <div className="container">
            {searchResults.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
