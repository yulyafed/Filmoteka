import { fetchTrendMovies, fetchGenresOfMovie, fetchSearchAnyMovie } from './ApiService';
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
    const input = document.querySelector('input[name="searchQuery"]')
    const searchMovie = input.value;

  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "🡸") {
    globalCurrentpage -= 1;
    if(searchMovie) {
        fetchSearchAnyMovie(searchMovie, globalCurrentpage)
        .then(({data }) => {
            render(data)
          })
          .catch(error => console.log(error));
    }else {
        fetchTrendMovies(globalCurrentpage)
        .then(({data }) => {
          render(data)
        })
        .catch(error => console.log(error));
    }
    
  }
  if (evt.target.textContent === "🡺") {
    globalCurrentpage += 1;
    if(searchMovie) {
        fetchSearchAnyMovie(searchMovie, globalCurrentpage)
        .then(({data }) => {
            render(data)
          })
          .catch(error => console.log(error));
    }else {
        fetchTrendMovies(globalCurrentpage)
        .then(({data }) => {
          render(data)
        })
        .catch(error => console.log(error));
    }
  }
  if (evt.target.textContent === "...") {
    return
  }
  if(searchMovie) {
    fetchSearchAnyMovie(searchMovie, evt.target.textContent)
    .then(({data }) => {
        render(data)
      })
      .catch(error => console.log(error));
}else {
    fetchTrendMovies(evt.target.textContent)
    .then(({data }) => {
      render(data)
    })
    .catch(error => console.log(error));
}
 
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render(data) {
    pagination(data.page, data.total_pages)

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
    })

    fetchGenresOfMovie()
    .then(response => {
      const {
        data: { genres },
      } = response;

      popularMoviesList.forEach(movie => {
        movie.genres = movie.genres.map(id => {
          genres.forEach(obj => {
            if (obj.id === id) {
              id = obj.name;
            }
          });
          return id;
          
        });
        switch (true) {
            case movie.genres.length > 0 && movie.genres.length <= 2:
              movie.genres = movie.genres.join(', ');
              break;
  
            case movie.genres.length > 2:
              movie.genres[2] = 'Other';
              movie.genres = movie.genres.slice(0, 3).join(', ');
              break;
  
            default:
              movie.genres = 'Genre N/A';
              break;
          }
        });
        return popularMoviesList
      }).then(popularMoviesList => {cardsMain.innerHTML = popularMoviesList.map(({ id, poster, title, genres, year }) => {
        return `
  <li class="main-render__item">
          <a href="#" class="main-render__link" data-id="${id}">          
            <img class="main-render__image"
            src="${poster ? `https://image.tmdb.org/t/p/w500${poster}` : imgPlaceholder}"
            alt="${title}" 
            data-id="${id}">
            <h2 class="main-render__title" data-id="${id}">
              ${title}
            </h2>
            <p class="main-render__text" data-id="${id}">${genres} | ${year}</p>
            
          </a>
        </li>
  `;
      }).join('')})
      .catch(error => {
        console.log('Failed to get genres : ', error);
        popularMoviesList.map(movie => (movie.genres = 'Genres N/A'));
      });

      
    
}
