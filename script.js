const cursor = document.querySelector('.cursor');
const coin = document.querySelector('.coin');

/* Курсор */

window.addEventListener('mousemove', (e) => {

  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* Анимация лого */

coin.addEventListener('click', () => {

  coin.classList.remove('coin-bounce');

  void coin.offsetWidth;

  coin.classList.add('coin-bounce');
});