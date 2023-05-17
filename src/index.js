import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const recipeData = [ //will modify to add recipes remotely later
  {
    title: "Spaghetti Bolognese",
    imageUrl: "https://www.errenskitchen.com/wp-content/uploads/2018/08/Spaghetti-Bolognese-1-3.jpg",
    cuisine: "Italian",
    ingredients: "spaghetti, ground beef, tomato sauce, onion, garlic",
    instructions: "1. Cook spaghetti according to package instructions. 2. Brown ground beef in a pan. 3. Add onion and garlic and cook until softened. 4. Add tomato sauce and simmer for 10 minutes. 5. Serve sauce over spaghetti.",
  },
  {
    title: "Pad Kee Mao",
    imageUrl: "https://hot-thai-kitchen.com/wp-content/uploads/2021/07/pad-kee-mao-blog.jpg",
    cuisine: "Thai",
    ingredients: "rice noodles, shrimp, tofu, bean sprouts, eggs",
    instructions: "1. Soak rice noodles in cold water for 30 minutes. 2. Heat oil in a pan and cook shrimp until pink. 3. Add tofu, bean sprouts, and eggs and stir-fry for 2 minutes. 4. Drain noodles and add to the pan. 5. Add sauce and stir-fry for another 2 minutes. 6. Serve hot.",
  },
];

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
    <div>
      <h1 className='header'>My Recipe App</h1>
      {!searched ? (
        <SearchBar onSearch={handleSearch} />
      ) : (
        <button onClick={handleGoBack}>Go Back</button> //allows you to go back
      )}
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
    <div>
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
    <div className={`recipe-card ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
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
