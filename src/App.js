import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex';
import { getPokemons, searchPokemon } from './components/Api';
import { getPokemonData } from './components/Api';
import Pagination from './components/Pagination';
import { FavoriteProvider } from './contexts/favoritesContext';
import FavoriteContext from './contexts/favoritesContext';


function App() {

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false)
  const favoritesKey = "favorites"


  const itensPerPage = 27;

  const fetchPokemons = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await getPokemons(itensPerPage, itensPerPage * page);
        const promises = data.results.map(async (pokemon) => {
          return await getPokemonData(pokemon.url)
        });
        const results = await Promise.all(promises);
        setPokemons(results)
        setLoading(false)
        setTotalPages(Math.ceil(data.count / itensPerPage))
      } catch (error) {
        console.log("FetchPokemons Error: ", error);
      }
  }


  const loadFavoritePokemons = () => {
   const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
   setFavorites(pokemons)
  }


  useEffect(() => {
      loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
}, [page]);


  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updatedFavorites.splice(favoriteIndex, 1);
    }else{
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites);
  }

  const onSearchHandler = async (pokemon) => {
    if(!pokemon){
     return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      setNotFound(true)
    }else{
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons,}}>
    <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
            <div className='not-found-text'>Pokemon inexistente!</div> ) : (
        <Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage} totalPages={totalPages} /> )}
    </div>
    </FavoriteProvider>
  )
}

export default App;
