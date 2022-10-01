import axios from 'axios';
const API_KEY = 'fe8296f47fdee638ac9cbbf0db61e69d';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANG = 'en-US';

const addToWatched = document.querySelector('.addWatchMy');
const removeFromWatched = document.querySelector('.removeWatchMy');
const myLibraryLink = document.querySelector('.watched');
const WATCHED_MOVIES = 'watched_list';
// const WatchedBtn = document.querySelector('.modal__choice-btn--watched');

const fetchTrendMovies = async page => {
  const response = await axios(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${LANG}`
  );
  return response;
};

fetchTrendMovies().then(data => {
  console.log(data.data.results);
  return data
});

let movieObject = {
  adult: false,
  backdrop_path: '/ng6SSB3JhbcpKTwbPDsRwUYK8Cq.jpg',
  belongs_to_collection: {
    id: 531241,
    name: 'Spider-Man (Avengers) Collection',
    poster_path:
      'https://image.tmdb.org/t/p/w300_and_h450_bestv2/plxMngMDZ3r2OSPn84UlyNHkmwi.jpg',
    budget: 160000000,
  },
  budget: 160000000,
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 878, name: 'Science Fiction' },
  ],
  homepage: 'https://www.marvel.com/movies/spider-man-far-from-home',
  id: 429617,
  imdb_id: 'tt6320628',
  original_language: 'en',
  original_title: 'Spider-Man: Far from Home',
  overview:
    'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
  popularity: 99.494,
  poster_path:
    'https://image.tmdb.org/t/p/w300_and_h450_bestv2/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  production_companies: [
    {
      id: 5,
      logo_path: '/71BqEFAF4V3qjjMPCpLuyJFB9A.png',
      name: 'Columbia Pictures',
      origin_country: 'US',
    },
    {
      id: 420,
      logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
      name: 'Marvel Studios',
      origin_country: 'US',
    },
    {
      id: 84041,
      logo_path: '/nw4kyc29QRpNtFbdsBHkRSFavvt.png',
      name: 'Pascal Pictures',
      origin_country: 'US',
    },
  ],
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  release_date: '2019-06-28',
  revenue: 1131927996,
  runtime: 129,
  spoken_languages: [
    { english_name: 'Czech', iso_639_1: 'cs', name: 'Český' },
    { english_name: 'Dutch', iso_639_1: 'nl', name: 'Nederlands' },
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
    { english_name: 'German', iso_639_1: 'de', name: 'Deutsch' },
    { english_name: 'Italian', iso_639_1: 'it', name: 'Italiano' },
  ],
  status: 'Released',
  tagline: 'It’s time to step up.',
  title: 'Spider-Man: Far from Home',
  video: false,
  vote_average: 7.489,
  vote_count: 13129,
};

// startMovieList();

addToWatched.addEventListener('click', onAddToWatchBtn);
removeFromWatched.addEventListener('click', onRemoveFromWatchedBtn);

function onAddToWatchBtn() {
  addTaskToLocalStorage(movieObject);
  // createData(movieObject);
  myLibraryLink.insertAdjacentHTML('beforeend', renderTask(movieObject));
}

// function startMovieList () {
//   const tasks = getTaskFromLocalStorage();
// myLibraryLink.insertAdjacentHTML('beforeend', renderTask(JSON.parse(tasks)));
// }

// ____________________________________SERVIS_________________________________________//

function addTaskToLocalStorage(movieObject) {
  const parsedLocalStorage = getTaskFromLocalStorage(WATCHED_MOVIES);
  console.log(parsedLocalStorage);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];

  returnTheSameMovie(listOfMovies, movieObject);
  localStorage.setItem(WATCHED_MOVIES, JSON.stringify(listOfMovies));
  return listOfMovies;
}

export function getTaskFromLocalStorage(key = WATCHED_MOVIES) {
  return localStorage.getItem(key);
}

function returnTheSameMovie(listOfMovies, movieObject) {
  // if (listOfMovies.id !== movieObject.id) {
  listOfMovies.push(movieObject);
  // }
  return listOfMovies;
}

function onRemoveFromWatchedBtn(addTaskToLocalStorage, movieObject) {
  let idList = listOfMovies[i].id;
  let idMovie = movieObject.id;
  console.log(idList);

  for (let i = 0; i <= listOfMovies.length; i += 1) {
    if (idList === idMovie) {
      arrCheck(idList, idMovie);
    }
  }
}
function arrCheck(arr, it) {
  for (let i = 0; i <= arr.length; i += 1) {
    if (arr[i] !== it) {
      arr.concat(arr[i]);
      let index = arr.indexOf(it);
      arr.splice(index, 1);
      console.log(arr);
      return arr;
    }
  }
}

// function remove (listOfMovies, movieObject) {
//   console.log(listOfMovies[0].id);
//   console.log(movieObject.id);

//   for (let i = 0; i <= listOfMovies.length; i += 1) {
//     if (listOfMovies[i].id === movieObject.id) {
//       listOfMovies.concat(movieObject);
//       console.log('true');
//     }

//     return listOfMovies;
//   }
// }

// ___________________________________MARKUP__________________________________________
// function createData({ genres, release_date }) {
//   const date = new Date();
//   console.log(genres[0].name);
//   const movieYear = date.getFullYear(release_date);
//   console.log(movieYear);
//   return movieYear;
// }

export function renderTask({
  poster_path,
  // backdrop_path,
  original_title,
  // genres.name,
  vote_average,
  // vote_count,
  // popularity,
  release_date,
}) {
  return `
  <li class="abcd">
      <img
        class="main-render__image"
        src="${poster_path}"
        alt="film poster"
        loading="lazy"
        width="395"
        height="634"
      />
      <div class="main-render__description">
        <h2 class="main-render__name">${original_title}</h2>
        <p class="main-render__genre">
          ${original_title}
          <span class="main-render__year">${release_date}</span>
          <span class="main-render__vote">>${vote_average}</span>

        </p>
      </div>
    </li>`;
}
// .join('');

// export default './js/LSW';
