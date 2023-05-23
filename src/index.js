import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { recipeData } from './recipeData'; // Import the recipeData constant
import './index.css';
import Pagination from './Pagination';

function App() {
  const [query, setQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(4); // Set number of recipes

  function handleSearch(query) {
    setQuery(query);
    setSearched(true);
    setCurrentPage(1); // Reset to the first page when performing a new search
  }

  function handleGoBack() {
    setSearched(false);
    setQuery('');
  }

  useEffect(() => {
    const filtered = recipeData.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered.length > 0 ? filtered : []);
    setCurrentPage(1); // Reset to the first page when the filtered recipes change
  }, [query]);

  // Get current recipes based on pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div>
        <h1 className='header'>My Recipe App</h1>
        {!searched ? (
          <SearchBar onSearch={handleSearch} />
        ) : (
          <button onClick={handleGoBack}>Go Back</button> //allows you to go back
        )}
        <div className="recipe-container">
          {currentRecipes.map(recipe => (
            <RecipeCard
            key={recipe.title}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            cuisine={recipe.cuisine}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            />
          ))}
        </div>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={filteredRecipes.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
  );
}

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

ReactDOM.render(<App />, document.getElementById('root'));
