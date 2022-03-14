/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import '../App.css';
import PokeBox from '../components/PokeBox';
import TagType from '../components/TagType';
import apiConnect from '../service/apiConnect';

import '../theme/global.scss';

function Home() {
  const [types, setTypes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const connect = apiConnect;

  async function getAllPokemon() {
    const getAll = await connect.getAll();
    setPokemonList(getAll.results);
    setIsLoading(false);
  }
  async function getPokemon() {
    getAllPokemon();
    const list = pokemonList.map(async (item) => connect.getPokemon(item.name));
    const results = await Promise.all(list);
    setPokemonData(results);
  }
  async function getTypes() {
    getAllPokemon();
    const typesData = await connect.getTypes();
    setTypes(typesData.results);
  }

  useEffect(async () => {
    getPokemon();
    getTypes();
  }, [isLoading]);
  return (
    <div className="App">
      <div className="AppContainer">
        {pokemonData.map((item) => (
          <Link
            key={item.id}
            // to="/details"
            to={`/${item.name}`}
            state={{ name: item }}
          >
            <PokeBox
              pokemon={item}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;