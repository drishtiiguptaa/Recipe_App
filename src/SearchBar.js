// SearchBar.js
import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleSearch() {
    console.log('Searching for:', query);
  }

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <input type="text" placeholder="Search recipes..." value={query} onChange={handleQueryChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;

