document.getElementById('menu-button').addEventListener('click', () => {
  const nav = document.getElementById('nav-links');
  nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
});
