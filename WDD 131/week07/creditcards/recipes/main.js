// main.js
import { recipes } from './recipes.mjs';

const container = document.getElementById('recipe-container');

recipes.forEach(recipe => {
  const card = document.createElement('article');
  card.classList.add('recipe-card');

  const filledStars = '⭐'.repeat(recipe.rating);
  const emptyStars = '☆'.repeat(5 - recipe.rating);

  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" />
    <div class="recipe-content">
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
        <span aria-hidden="true">${filledStars}${emptyStars}</span>
      </span>
    </div>
  `;

  container.appendChild(card);
});
