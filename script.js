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


/* Загрузка ссылок */

async function loadLinks() {

  try {

    const response = await fetch(
      'links.json?v=' + Date.now()
    );

    const data = await response.json();

    const container = document.getElementById(
      'links-container'
    );

    container.innerHTML = '';


    const links = [

      {
        title: 'Оператор',
        url: data.operator
      },

      {
        title: 'Чат',
        url: data.chat
      },

      {
        title: 'Канал',
        url: data.channel
      },

      {
        title: 'Наш бот',
        url: data.bot
      }

    ];


    links.forEach(link => {

      if (!link.url) return;

      container.innerHTML += `

      <a
        href="${link.url}"
        class="glass-btn"
        target="_blank"
      >

        <img src="link.png" class="btn-icon">

        <span>${link.title}</span>

      </a>

      `;

    });

  }

  catch (error) {

    console.error(error);

  }

}


loadLinks();