import { fetchGenresOfMovie, fetchTrendMovies } from './ApiService';
import { stylePagination } from './pagination';


const START_PAGE = 1;
let page = START_PAGE;
let popularMoviesList = [];

const cardsMain = document.querySelector('.main-render');

createHomeGallery(page);

export async function createHomeGallery(page) {

  await fetchTrendMovies(page)
    .then(({ data: { results } }) => {
      stylePagination(START_PAGE, page);
      // console.log(results);

      popularMoviesList = [];
      results.forEach(movie => {
        let movieData = {
          id: movie.id,
          poster: movie.poster_path,
          title: movie.original_title,
          genres: movie.genre_ids,
          year: movie.release_date ? movie.release_date.slice(0, 4) : 'Year N/A',
        };
        // console.log(movieData);

        popularMoviesList.push(movieData);
      });
    })
    .catch(error => console.log(error));

  await fetchGenresOfMovie()
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
    })
    .catch(error => {
      console.log('Failed to get genres : ', error);
      popularMoviesList.map(movie => (movie.genres = 'Genres N/A'));
    });

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

    setTimeout(() => {
        if (popularMoviesList.length === 0) {
          const errorText = `<li class="api-error">
            <p class="api-error__desc">The list of popular movies is temporarily unavailable.<br>Please, retry later!
            </p>
            </li>`;
          cardsMain.innerHTML = errorText;
        }
      }, 500);
    }
    
