// blog.js

/*
  1. Array of article data
  2. Function to render articles dynamically
  3. DOMContentLoaded hook to initialize
*/

const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description:
      'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Book cover for Septimus Heap 1',
    ages: '10–14',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description:
      'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc:
      'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Book cover for Magnus Chase 1',
    ages: '12–16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 3,
    title: 'Belgariad Book One: Pawn of Prophecy',
    date: 'Feb 12, 2022',
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
      'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
    imgAlt: 'Book cover for Pawn of Prophecy',
    ages: '12–16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐⭐'
  }
];

/**
 * buildArticles: renders the array of articles into the DOM
 */
function buildArticles() {
  // 1. Select the container for posts
  const container = document.querySelector('.posts');
  if (!container) return;

  // 2. Clear any existing content
  container.innerHTML = '';

  // 3. Loop through each article data
  articles.forEach(item => {
    // a) Create <article> and add class
    const articleEl = document.createElement('article');
    articleEl.classList.add('post');

    // b) Create inner HTML using template literal
    articleEl.innerHTML = `
      <div class="post-meta">
        <time datetime="${new Date(item.date).toISOString().split('T')[0]}">${item.date}</time>
        <ul>
          <li>${item.ages}</li>
          <li>${item.genre}</li>
          <li>${item.stars}</li>
        </ul>
      </div>
      <div class="post-content">
        <h2>${item.title}</h2>
        <img src="${item.imgSrc}" alt="${item.imgAlt}">
        <p>${item.description}</p>
      </div>
    `;

    // c) Append to container
    container.append(articleEl);
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', buildArticles);
