const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '****'
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
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	}
]

// 2. When the page is loaded...
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.posts');

  // 3. For each article, build & append markup
  articles.forEach(({ title, date, description, imgSrc, imgAlt, ages, genre, stars }) => {
    // create elements
    const articleEl = document.createElement('article');
    articleEl.classList.add('post');

    const metaDiv = document.createElement('div');
    metaDiv.classList.add('post-meta');

    const timeEl = document.createElement('time');
    timeEl.setAttribute('datetime', new Date(date).toISOString().split('T')[0]);
    timeEl.textContent = date;

    const authorP = document.createElement('p');
    authorP.innerHTML = `Ages: <strong>${ages}</strong> • Genre: <strong>${genre}</strong> • Rating: <strong>${stars}</strong>`;

    metaDiv.append(timeEl, authorP);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('post-content');

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;

    const descP = document.createElement('p');
    descP.textContent = description;

    contentDiv.append(h2, img, descP);

    articleEl.append(metaDiv, contentDiv);
    container.append(articleEl);
  });
});