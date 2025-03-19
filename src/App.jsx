import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard/PokemonCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Loader2 } from 'lucide-react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        setPokemon(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPokemonId = (url) => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="loader" size={48} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Pokedex</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="pokemon-grid">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} id={getPokemonId(p.url)} />
        ))}
      </div>
      {filteredPokemon.length === 0 && (
        <div className="no-results">
          <p>No Pokemon found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default App;