import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { recipeData } from './recipeData'; // Import the recipeData constant
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';

function App() {
  const [query, setQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(query) {
    setQuery(query);
    setSearched(true);
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
  }, [query]);

  return (
    <Router>
      <div>
        <h1 className='header'>My Recipe App</h1>
        {!searched ? (
          <SearchBar onSearch={handleSearch} />
        ) : (
          <button onClick={handleGoBack}>Go Back</button> //allows you to go back
        )}
        <div className="recipe-container">
          {filteredRecipes.map(recipe => (
            <RecipeCard
            key={recipe.title}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            cuisine={recipe.cuisine}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            />
          ))}
          <Routes>
            <Route exact path="/" component={recipeData} />
            <Route path="/recipes/:recipeTitle" component={RecipeDetailsPage} />
          </Routes>
        </div>
      </div>
    </Router>
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
  const navigate = useNavigate();
  
  function toggleExpand() {
    setExpanded(!expanded);
  }

  function handleClickForMoreDetails(event) {
    event.stopPropagation();
    navigate(`/recipes/${props.title}`);
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
          <Link to={`/recipes/${props.title}`}>
            <button onClick={handleClickForMoreDetails}>Click for more details</button>
          </Link>
          <VoteButton />
        </div>
      )}
    </div>
  );
}

function RecipeDetailsPage() {
  const { recipeTitle } = useParams();
  const recipe = recipeData.find(recipe => recipe.title === recipeTitle);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Cuisine: {recipe.cuisine}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Cooking Time: {recipe.cooking_time}</p>
      <p>Serving Size: {recipe.serving_size}</p>
    </div>
  );
}

function VoteButton() {
  return (
    <button>Vote</button>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
