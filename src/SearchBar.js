import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
  
    function handleSearch() {
      onSearch(query);
    }
  
    function handleQueryChange(event) {
      setQuery(event.target.value);
    }
  
    return (
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={handleQueryChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  }

export default SearchBar;