import React, { useState } from 'react';

function RecipeCard(props) {
    const [expanded, setExpanded] = useState(false);
    
    function toggleExpand() {
      setExpanded(!expanded);
    }
  
    return (
      <div className="recipe-card" onClick={toggleExpand}>
        <div className="card-content">
          <div className="image-container">
            <img src={props.imageUrl} alt={props.title} />
          </div>
          <div className="details-container">
            <h2>{props.title}</h2>
          </div>
        </div>
        {expanded && (
          <div className="expanded-content">
            <p>Cuisine: {props.cuisine}</p>
            <p>Ingredients: {props.ingredients}</p>
            <p>Instructions: {props.instructions}</p>
            <VoteButton />
          </div>
        )}
      </div>
    );
  }
  
function VoteButton() {
    return (
      <button>Vote</button>
    );
  }

export default RecipeCard;