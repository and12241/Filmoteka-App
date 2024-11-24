const inputFind = document.querySelector('.input-find');
const btnFind = document.querySelector('.btn-find');
const mainContainer = document.querySelector('.film-container');
const btnRandome = document.querySelector('.btn-random');

let countP = 1;
btnFind.addEventListener('click', ()=> {
    const filmName = inputFind.value;
    console.log(filmName);
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'X-API-KEY': 'W8ZADT8-FND4DGW-G1BPFYX-Q5DS5BD'}
      };
      
      fetch(`https://api.kinopoisk.dev/v1.4/movie/search?query=${filmName}`, options)
        .then(response => response.json())
        .then(response => {
          mainContainer.innerHTML = '';
          const flimCards = RenderCardbyName(response);
          mainContainer.insertAdjacentHTML('beforeend',flimCards);
          console.log(response);
        })
        .catch(err => console.error(err));
})

btnRandome.addEventListener('click', ()=> {
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': 'W8ZADT8-FND4DGW-G1BPFYX-Q5DS5BD'}
  };
  
  fetch('https://api.kinopoisk.dev/v1.4/movie/random?releaseYears.start=1980-2024&rating.imdb=7-10&ageRating=0-18', options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      mainContainer.innerHTML = '';
      const randomTitleCard = RenderCardRandom(response);
      mainContainer.insertAdjacentHTML('beforeend', randomTitleCard)
    })
    .catch(err => console.error(err));
});

function RenderCardbyName (response) {
  return response.docs.map(({ageRating,genres,poster,name,rating,year,description}) => {
    const ageRating_ = ageRating !== null ? `${ageRating}` : '0';
    const posterUrl_ = poster && poster.url !==null ? `${poster.url}` : 'default-movie.jpg';
    const descript_ = description !==null? `${description}` : 'Описания нету';
    return `<ul class="cards-film">
            <li class="card list">
                <img src="${posterUrl_}" alt="" class = "card-image">
                    <h2 class="movie-name">${name}</h2>
                <div class="movie-info">
                    <p class="movie-text restrictions">${ageRating_}+</p>
                    <p class="movie-text genres">${genres[0].name}</p>
                    <p class="movie-text year">${year}</p>
                    <p class="movie-text rating">imdb: ${rating.imdb}</p>
                    <p class="movie-text description hidden">${descript_}</p>
                </div>
            </li>
        </ul>`;
  }).join('')
}
function RenderCardStart (response) {
  return response.docs.map(({ageRating,genres,poster,name,rating,year,alternativeName,votes,description}) => {
    const ageRating_ = ageRating !== null ? `${ageRating}` : '0';
    const posterUrl_ = poster && poster.url !==null ? `${poster.url}` : 'default-movie.jpg';
    const name_ = name !== null && name !== undefined ? name : alternativeName;
    const descript_ = description !==null? `${description}` : 'Описания нету';
    return `<ul class="cards-film">
            <li class="card list"
            data-title = ${name_}>
                <img src="${posterUrl_}" alt="" class = "card-image">
                    <h2 class="movie-name">${name_}</h2>
                <div class="movie-info">
                    <p class="movie-text restrictions">${ageRating_}+</p>
                    <p class="movie-text genres">${genres[0].name}</p>
                    <p class="movie-text year">${year}</p>
                    <p class="movie-text rating">imdb: ${rating.imdb}</p>
                    <p class="movie-text description hidden">${descript_}</p>
                </div>
            </li>
        </ul>`;
  }).join('')
}
function RenderCardRandom ({ageRating,genres,poster,alternativeName,rating,year,name,description}=response) {
  const ageRating_ = ageRating !== null ? `${ageRating}` : '0';
  const posterUrl_ = poster && poster.url !==null ? `${poster.url}` : 'default-movie.jpg';
  const name_ = name !== null && name !== undefined ? name : alternativeName;
  const descript_ = description !==null? `${description}` : 'Описания нету';
  return `<ul class="cards-film">
          <li class="card list"
          data-title = ${name_}>
              <img src="${posterUrl_}" alt="" class = "card-image">
                  <h2 class="movie-name">${name_}</h2>
              <div class="movie-info">
                  <p class="movie-text restrictions">${ageRating_}+</p>
                  <p class="movie-text genres">${genres[0].name}</p>
                  <p class="movie-text year">${year}</p>
                  <p class="movie-text rating">imdb: ${rating.imdb}</p>
                  <p class="movie-text description hidden">${descript_}</p>
              </div>
          </li>
      </ul>`;
}



// Модальное окно
const cardsFilms = document.querySelector(".film-container");
const modalContent = document.querySelector(".modal-content");
const modalTitle = document.querySelector(".title-modal");
const modalVote = document.querySelector('.ratings'); 
const modalOrig = document.querySelector('.title-m');
const modalGenres = document.querySelector('.genres');
const modalImg = document.querySelector ('.modal-images');
const closeModalBtn = document.querySelector('.close-modal');
const backdrop = document.querySelector(".backdrop");
const modalDescription = document.querySelector(".descript");
console.log(modalDescription);

cardsFilms.addEventListener("click", (event) => {
  console.log(event.target);
  // Проверяем, что клик был на элементе с классом 'card' или внутри него
  const targetElement = event.target.closest('.card');
  if (targetElement) {
    const title = targetElement.querySelector('.movie-name').textContent;
    const genres = targetElement.querySelector('.genres').textContent;
    const images = targetElement.querySelector('.card-image').src;
    const rating = document.querySelector('.rating').textContent;
    const descript = targetElement.querySelector(".description").textContent;  
    modalTitle.textContent = title;
    modalOrig.textContent = title; 
    modalGenres.textContent = genres;
    modalImg.src = images;
    modalVote.textContent = rating;
    modalDescription.textContent = descript;
    console.log(modalTitle)
    }
    openModal();
});


closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  modalContent.classList.remove('is-hidden');
  backdrop.classList.remove('is-hidden');
}

function closeModal() {
  modalContent.classList.add('is-hidden');
  backdrop.classList.add('is-hidden');
}



// default film при заукпске сайта

let countPage = 1;
const backPage = document.querySelector('.back-page');
const nextPage = document.querySelector('.next-page');

nextPage.addEventListener('click', () => {
  countPage += 1;
  scrollUpPage();
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': 'W8ZADT8-FND4DGW-G1BPFYX-Q5DS5BD'}
  };
  
  fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${countPage}&limit=12&releaseYears.start=2000-2024&rating.imdb=6.5-10&rating.kp=7-10`, options)
    .then(response => response.json())
    .then(response => {
      mainContainer.innerHTML = '';
      const filmCards = RenderStandartCard(response);
      mainContainer.insertAdjacentHTML('beforeend',filmCards);
      console.log(response);
      console.log(countPage)
    })
    .catch(err => console.error(err));
});

backPage.addEventListener('click', () => {
  countPage -= 1;
  scrollUpPage();
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'X-API-KEY': 'W8ZADT8-FND4DGW-G1BPFYX-Q5DS5BD'}
  };
  
  fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${countPage}&limit=12&releaseYears.start=2000-2024&rating.imdb=6.5-10&rating.kp=7-10`, options)
    .then(response => response.json())
    .then(response => {
      mainContainer.innerHTML = '';
      const filmCards = RenderStandartCard(response);
      mainContainer.insertAdjacentHTML('beforeend',filmCards);
      console.log(response);
      console.log(countPage)
    })
    .catch(err => console.error(err));
});

function scrollUpPage () {
  document.documentElement.scrollIntoView({
    behavior: 'smooth', 
    block: 'start'
  });
}


const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'X-API-KEY': 'W8ZADT8-FND4DGW-G1BPFYX-Q5DS5BD'}
};

fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${countPage}&limit=12&releaseYears.start=2000-2024&rating.imdb=6.5-10&rating.kp=7-10`, options)
  .then(response => response.json())
  .then(response => {
    mainContainer.innerHTML = '';
    const filmCards = RenderStandartCard(response);
    mainContainer.insertAdjacentHTML('beforeend',filmCards);
    console.log(response);
    console.log(countPage)
  })
  .catch(err => console.error(err));

function RenderStandartCard (response) {
  return response.docs.map(({ageRating,genres,poster,name,rating,year,alternativeName,description,id}) => {
    const ageRating_ = ageRating !== null ? `${ageRating}` : '12';
    const posterUrl_ = poster && poster.url !==null ? `${poster.url}` : 'default-movie.jpg';
    const descript_ = description !==null? `${description}` : 'Описания нету';
    const name_ = name !== null ? `${name}` : `${alternativeName}`;

    return `<ul class="cards-film">
            <li class="card list">
                <img src="${posterUrl_}" alt="" class = "card-image">
                    <h2 class="movie-name">${name_}</h2>
                <div class="movie-info">
                    <p class="movie-text restrictions">${ageRating_}+</p>
                    <p class="movie-text genres">${genres[0].name}</p>
                    <p class="movie-text year">${year}</p>
                    <p class="movie-text rating">imdb: ${rating.imdb}</p>
                    <p class="movie-text description hidden">${descript_}</p>
                </div>
            </li>
        </ul>`;
  }).join('');
  
}


const button = document.querySelector('.button')
const menu = document.querySelector('.menu')
const menuLinks = document.querySelectorAll('.menu-link')

button.addEventListener('click', (e) => {
  button.classList.toggle('active')

  if (button.classList.contains('active')) {
    button.setAttribute('aria-expanded', 'true')
    menu.setAttribute('aria-hidden', 'false')
    menuLinks.forEach(link => link.setAttribute('tabindex', '0'))
  } else {
    button.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
    menuLinks.forEach(link => link.setAttribute('tabindex', '-1'))
  }
})

let genresSelect = '';
function RenderCardbyGenres (response) {
  return response.docs.map(({ageRating,genres,poster,name,rating,year,alternativeName,description,id}) => {
    const ageRating_ = ageRating !== null ? `${ageRating}` : '12';
    const posterUrl_ = poster && poster.url !==null ? `${poster.url}` : 'default-movie.jpg';
    const descript_ = description !==null? `${description}` : 'Описания нету';
    const name_ = name !== null ? `${name}` : `${alternativeName}`;

    return `<ul class="cards-film">
            <li class="card list">
                <img src="${posterUrl_}" alt="" class = "card-image">
                    <h2 class="movie-name">${name_}</h2>
                <div class="movie-info">
                    <p class="movie-text restrictions">${ageRating_}+</p>
                    <p class="movie-text genres">${genres[0].name}</p>
                    <p class="movie-text year">${year}</p>
                    <p class="movie-text rating">imdb: ${rating.imdb}</p>
                    <p class="movie-text description hidden">${descript_}</p>
                </div>
            </li>
        </ul>`;
  }).join('');

} 
  // Получаем все ссылки с классом .menu-link
  const genresLinks = document.querySelectorAll('.menu-link');

  // Добавляем обработчик событий для каждого пункта меню
  genresLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Предотвращаем переход по ссылке
      genresSelect = link.textContent; // Сохраняем текст в переменную
      console.log('Выбранный пункт меню:', genresSelect); // Выводим в консоль
      fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&genres.name=${genresSelect}&rating.imdb=7-10`, options)
    .then(res => res.json())
    .then(response => {
      mainContainer.innerHTML = '';
      const filmCards = RenderStandartCard(response);
      mainContainer.insertAdjacentHTML('beforeend',filmCards);
      console.log(response);
      console.log(countPage)
    }
    )
    .catch(err => console.error(err));
    });
  });  
