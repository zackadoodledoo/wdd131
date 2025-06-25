// main.js
import { recipes } from './recipes.mjs';

const container = document.getElementById('recipe-container');
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');
const resetBtn = document.getElementById('reset-btn');

// Utility: Render star ratings
function ratingTemplate(rating) {
  const fullStars = '⭐'.repeat(Math.floor(rating));
  const emptyStars = '☆'.repeat(5 - Math.floor(rating));
  return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
            <span aria-hidden="true">${fullStars}${emptyStars}</span>
          </span>`;
}

// Render single recipe card HTML
function renderRecipe(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-content">
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        ${ratingTemplate(recipe.rating)}
      </div>
    </article>`;
}

// Render a list of recipes to the container
function renderRecipes(recipeList) {
  if (recipeList.length === 0) {
    container.innerHTML = '<p>No recipes found. Try another search.</p>';
    return;
  }
  container.innerHTML = recipeList.map(renderRecipe).join('');
}

// Filter recipes by search query
function filterRecipes(query) {
  query = query.toLowerCase();

  const filtered = recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(query);
    const inDescription = recipe.description.toLowerCase().includes(query);
    const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const inIngredients = recipe.recipeIngredient.find(ing => ing.toLowerCase().includes(query));
    return inName || inDescription || inTags || inIngredients;
  });

  // Sort alphabetically by name
  filtered.sort((a, b) => a.name.localeCompare(b.name));

  return filtered;
}

// Handle search form submit
function searchHandler(e) {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  const results = filterRecipes(query);
  renderRecipes(results);
}

// Handle reset button click
function resetHandler() {
  searchInput.value = '';
  init();
}

// Initialize page with a random recipe
function init() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const randomRecipe = recipes[randomIndex];
  renderRecipes([randomRecipe]);
}

// Attach event listeners
searchForm.addEventListener('submit', searchHandler);
resetBtn.addEventListener('click', resetHandler);

// Run on page load
init();