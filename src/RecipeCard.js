// RecipeCard.js
import React from 'react';
import VoteButton from './VoteButton';

function RecipeCard(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <img src={props.imageUrl} alt={props.title} />
      <p>Cuisine: {props.cuisine}</p>
      <p>Ingredients: {props.ingredients}</p>
      <p>Instructions: {props.instructions}</p>
      <VoteButton />
    </div>
  );
}

export default RecipeCard;