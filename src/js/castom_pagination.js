import { fetchTrendMovies } from './ApiService';
const cardsMain = document.querySelector('.main-render');


const paginationBox = document.querySelector('.pagination')

let globalCurrentpage = 0;
/**
 * Create pagination
 * @param {Number} currentPage - current page for search
 * @param {Number} allPages  - all pages for search
 * @return {String} markup - markup for pagination
 */
export default function pagination(currentPage, allPages) {
  let markup = ''
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  globalCurrentpage = currentPage;

  if (currentPage > 1) {
    markup += `<li class="pagination-left-arrow">&#129144;</li>`
  }
  if (currentPage > 1) {
    markup += `<li class="pagination-number-first">1</li>`
  }
  if (currentPage > 4) {
    markup += `<li class="pagination-dots">...</li>`
  }
  if (currentPage > 3) {
    markup += `<li class="pagination-number">${beforeTwoPage}</li>`
  }
  if (currentPage > 2) {
    markup += `<li class="pagination-number">${beforePage}</li>`
  }
  markup += `<li class="pagination-number active"><b>${currentPage}</b></li>`

  if (allPages - 1 > currentPage) {
    markup += `<li class="pagination-number">${afterPage}</li>`
  }

  if (allPages - 2 > currentPage) {
    markup += `<li class="pagination-number">${afterTwoPage}</li>`
  }


  if (allPages - 3 > currentPage) {
    markup += `<li class="pagination-dots">...</li>`
  }

  if (allPages > currentPage) {
    markup += `<li class="pagination-number">${allPages}</li>`
    markup += `<li class="pagination-right-arrow">&#129146;<li>`
  }

  paginationBox.innerHTML = markup;
}

paginationBox.addEventListener('click', handlerPagination)


function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "🡸") {
    globalCurrentpage -= 1;
    fetchTrendMovies(globalCurrentpage)
  .then(({data }) => {
    render(data)
  })
  .catch(error => console.log(error));
  }
  if (evt.target.textContent === "🡺") {
    globalCurrentpage += 1;
    fetchTrendMovies(globalCurrentpage)
  .then(({data }) => {
    render(data)
  })
  .catch(error => console.log(error));
  }
  if (evt.target.textContent === "...") {
    return
  }
  fetchTrendMovies(evt.target.textContent)
  .then(({data }) => {
    render(data)
  })
  .catch(error => console.log(error));
  
}

function render(data) {
    pagination(data.page, data.total_pages)
    console.log(data); 

    const popularMoviesList = [];
    data.results.forEach(movie => {
      let movieData = {
        id: movie.id,
        poster: movie.poster_path,
        title: movie.original_title,
        genres: movie.genre_ids,
        year: movie.release_date ? movie.release_date.slice(0, 4) : 'Year N/A',
      };

      popularMoviesList.push(movieData);
      cardsMain.innerHTML = popularMoviesList
    .map(({ id, poster, title, genres, year }) => {
      return `
<li class="main-render__item">
        <a href="#" class="main-render__link" data-id="${id}">
        <div class="main-render__image-box">
          <img class="main-render__image"
          src="${poster ? `https://image.tmdb.org/t/p/w500${poster}` : imgPlaceholder}"
          alt="${title}" 
          data-id="${id}">
          </div>
          <div class="main-render__discription">
          <h2 class="main-render__title" data-id="${id}">
            ${title}
          </h2>
          <p class="main-render__text" data-id="${id}">${genres} | ${year}</p>
          </div>
        </a>
      </li>
`;
    })
    .join('');
    });
}