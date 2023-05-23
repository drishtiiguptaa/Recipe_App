import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { recipeData } from './recipeData'; // Import the recipeData constant
import './index.css';
import Pagination from './Pagination';
import RecipeCard from './RecipeCard';
import CuisineFilter from './CuisineFilter';
import SearchBar from './SearchBar';

function App() {
  const [query, setQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(4);
  const [recipesPerPage] = useState(3); // Set number of recipes
  const [selectedCuisine, setSelectedCuisine] = useState('');

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

  // Filter recipes based on selected cuisine
  const filteredByCuisineRecipes = selectedCuisine
    ? filteredRecipes.filter(recipe => recipe.cuisine === selectedCuisine)
    : filteredRecipes;

  // Get current recipes based on pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredByCuisineRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtering by cuisine type
  function handleCuisineChange(cuisine) {
    setSelectedCuisine(cuisine);
    setCurrentPage(1); // Reset to the first page when the cuisine filter changes
  }

  const cuisines = Array.from(new Set(recipeData.map(recipe => recipe.cuisine)));

  return (
      <div>
        <h1 className='header'>My Recipe App</h1>
        {!searched ? (
          <SearchBar onSearch={handleSearch} />
        ) : (
          <button onClick={handleGoBack}>Go Back</button> //allows you to go back
        )}
        <CuisineFilter
          cuisines={cuisines}
          selectedCuisine={selectedCuisine}
          onCuisineChange={handleCuisineChange}
        />
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

ReactDOM.render(<App />, document.getElementById('root'));
