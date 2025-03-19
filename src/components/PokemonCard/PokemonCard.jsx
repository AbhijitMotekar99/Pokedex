import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ name, id }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-card-front">
          <img src={imageUrl} alt={name} className="pokemon-image" />
          <h3 className="pokemon-name">{name}</h3>
          <span className="pokemon-number">#{String(id).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;