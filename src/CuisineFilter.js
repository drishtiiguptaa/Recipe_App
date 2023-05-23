import React from 'react';

function CuisineFilter({ cuisines, selectedCuisine, onCuisineChange }) {
    return (
      <div>
        <label htmlFor="cuisine-filter">Select Cuisine:</label>
        <select
          id="cuisine-filter"
          value={selectedCuisine}
          onChange={event => onCuisineChange(event.target.value)}
        >
          <option value="">All Cuisines</option>
          {cuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
    );
  }

export default CuisineFilter;
  