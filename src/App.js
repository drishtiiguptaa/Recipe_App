// App.js
import React from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

function App() {
  return (
    <div>
      <h1>My Recipe App</h1>
      <SearchBar />
      <RecipeCard
        title="Spaghetti Bolognese"
        imageUrl="https://www.errenskitchen.com/wp-content/uploads/2018/08/Spaghetti-Bolognese-1-3.jpg"
        cuisine="Italian"
        ingredients="spaghetti, ground beef, tomato sauce, onion, garlic"
        instructions="1. Cook spaghetti according to package instructions. 2. Brown ground beef in a pan. 3. Add onion and garlic and cook until softened. 4. Add tomato sauce and simmer for 10 minutes. 5. Serve sauce over spaghetti."
      />
      <RecipeCard
        title="Pad Kee Mao"
        imageUrl="https://hot-thai-kitchen.com/wp-content/uploads/2021/07/pad-kee-mao-blog.jpg"
        cuisine="Thai"
        ingredients="rice noodles, shrimp, tofu, bean sprouts, eggs"
        instructions="1. Soak rice noodles in cold water for 30 minutes. 2. Heat oil in a pan and cook shrimp until pink. 3. Add tofu, bean sprouts, and eggs and stir-fry for 2 minutes. 4. Drain noodles and add to the pan. 5. Add sauce and stir-fry for another 2 minutes. 6. Serve hot."
      />
    </div>
  );
}

export default App;
