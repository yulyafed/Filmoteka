// import { refs } from './refs';
// import './ApiService';
// import { fetchMovieById } from './ApiService';
// import './openModal';


// import axios from 'axios';
// const API_KEY = 'fe8296f47fdee638ac9cbbf0db61e69d';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const LANG = 'en-US';

// const WatchedBtn = document.querySelector('.modal__choice-btn--watched');

// const fetchMovieById = async movieId => {
//   const response = await axios(
//     `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANG}`
//   );
//   return response;
// };

// fetchMovieById().then(data => {
//   movieId = data.data.results.id;
// console.log(movieId);
//   return movieId;
// });

// let addToWatchedBtn = document.querySelector('.addToWatched');
// let removeFromWatchedBnt = document.querySelector('.removeFromWatched');




// ___________________________________________FATCH_____________________________________
refs.mainRenderList.addEventListener('click', openBackDrop1);

console.log(refs.mainRenderList);

function openBackDrop1(event) {
  event.preventDefault();
  const currentLink = event.target.closest('a');
  const currentId = currentLink.getAttribute('data-id');
  console.log(currentId);
  // let movieObject = 
fetchMovieById(currentId).then(res => {
    const movieObject = res.data;
    console.log(movieObject);
    // 
    // refs.modalInfoBox.insertAdjacentHTML("beforeend", createBackDropMarkUp(result))
    return movieObject;
  });
  console.log(movieObject);
  getTextContent(movieObject);
  return movieObject
}
// movieObject()
// console.log(movieObject);

const addWatchedChangeClassBtn = document.querySelector(
  'button[data-modBtn="addToWatchedBtn"]'
);
const WATCHED_MOVIES = 'watched_list';

// let movieObject = {
//   adult: false,
//   backdrop_path: '/ng6SSB3JhbcpKTwbPDsRwUYK8Cq.jpg',
//   belongs_to_collection: {
//     id: 531241,
//     name: 'Spider-Man (Avengers) Collection',
//     poster_path:
//       'https://image.tmdb.org/t/p/w300_and_h450_bestv2/plxMngMDZ3r2OSPn84UlyNHkmwi.jpg',
//     budget: 160000000,
//   },
//   budget: 160000000,
//   genres: [
//     { id: 28, name: 'Action' },
//     { id: 12, name: 'Adventure' },
//     { id: 878, name: 'Science Fiction' },
//   ],
//   homepage: 'https://www.marvel.com/movies/spider-man-far-from-home',
//   id: 429617,
//   imdb_id: 'tt6320628',
//   original_language: 'en',
//   original_title: 'Spider-Man: Far from Home',
//   overview:
//     'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
//   popularity: 99.494,
//   poster_path:
//     'https://image.tmdb.org/t/p/w300_and_h450_bestv2/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
//   production_companies: [
//     {
//       id: 5,
//       logo_path: '/71BqEFAF4V3qjjMPCpLuyJFB9A.png',
//       name: 'Columbia Pictures',
//       origin_country: 'US',
//     },
//     {
//       id: 420,
//       logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
//       name: 'Marvel Studios',
//       origin_country: 'US',
//     },
//     {
//       id: 84041,
//       logo_path: '/nw4kyc29QRpNtFbdsBHkRSFavvt.png',
//       name: 'Pascal Pictures',
//       origin_country: 'US',
//     },
//   ],
//   production_countries: [
//     { iso_3166_1: 'US', name: 'United States of America' },
//   ],
//   release_date: '2019-06-28',
//   revenue: 1131927996,
//   runtime: 129,
//   spoken_languages: [
//     { english_name: 'Czech', iso_639_1: 'cs', name: 'Český' },
//     { english_name: 'Dutch', iso_639_1: 'nl', name: 'Nederlands' },
//     { english_name: 'English', iso_639_1: 'en', name: 'English' },
//     { english_name: 'German', iso_639_1: 'de', name: 'Deutsch' },
//     { english_name: 'Italian', iso_639_1: 'it', name: 'Italiano' },
//   ],
//   status: 'Released',
//   tagline: 'It’s time to step up.',
//   title: 'Spider-Man: Far from Home',
//   video: false,
//   vote_average: 7.489,
//   vote_count: 13129,
// };
// ____________________________CHANGE BTN_______________________________________

// function getObjFromOpenModalToLocalStorage(movieObject) {
//   return movieObject;
// }

refs.mainRenderList.addEventListener('click', getToButtons);

function getToButtons(evt) {
  evt.preventDefault();

  setTimeout(() => {
    const modalWatchBTN = document.querySelector(
      '#backdrop > div > div > div > div > ul > li:nth-child(1) > button'
    );
    console.log(modalWatchBTN);
    modalWatchBTN.addEventListener('click', showSome);
  }, 1000);
}




//  setTimeout(() => {
getTextContent(movieObject);

// }, 1000);

// function getObjFromOpenModalToLocalStorage (movieObject) {
// return movieObject
// }

addWatchedChangeClassBtn.addEventListener('click', onClassAddWatched(movieObject));

function getTextContent(movieObject) {
  const parsedLocalStorage = getTextContentLocalStorage(WATCHED_MOVIES);
  const listOfMovies = JSON.parse(parsedLocalStorage);
  console.log(movieObject);
  const idMovie = movieObject.id;
  const index = listOfMovies.findIndex(film => film.id === idMovie);
  if (index !== -1) {
    addWatchedChangeClassBtn.textContent = 'REMOVE FROM WATCHED';
  } else addWatchedChangeClassBtn.textContent = 'ADD TO WATCHED';
}

function getTextContentLocalStorage(key = WATCHED_MOVIES) {
  return localStorage.getItem(key);
}

function onClassAddWatched(movieObject) {
  if (addWatchedChangeClassBtn.textContent === 'ADD TO WATCHED') {
    addWatchedChangeClassBtn.textContent = 'REMOVE FROM WATCHED';
    addTaskToLocalStorage(movieObject);
  } else if (addWatchedChangeClassBtn.textContent === 'REMOVE FROM WATCHED') {
    addWatchedChangeClassBtn.textContent = 'ADD TO WATCHED';
    RemoveFromWatchedBtn(movieObject);
  }
}
// ____________________________________SERVIS_________________________________________//

function addTaskToLocalStorage(movieObject) {
  const parsedLocalStorage = getTaskFromLocalStorage(WATCHED_MOVIES);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  listOfMovies.push(movieObject);
  localStorage.setItem(WATCHED_MOVIES, JSON.stringify(listOfMovies));
  return listOfMovies;
}

function RemoveFromWatchedBtn() {
  const parsedLocalStorage = getTaskFromLocalStorage(WATCHED_MOVIES);
  const listOfMovies = JSON.parse(parsedLocalStorage);
  const idMovie = movieObject.id;
  const index = listOfMovies.findIndex(film => film.id === idMovie);
  if (index !== -1) {
    listOfMovies.splice(index, 1);
  }
  localStorage.setItem(WATCHED_MOVIES, JSON.stringify(listOfMovies));

  return listOfMovies;
}

export function getTaskFromLocalStorage(key = WATCHED_MOVIES) {
  return localStorage.getItem(key);
}

// ___________________________________MARKUP__________________________________________

// export function renderTask({
//   poster_path,
//   // backdrop_path,
//   original_title,
//   // genres.name,
//   vote_average,
//   // vote_count,
//   // popularity,
//   release_date,
// }) {
//   return `
//   <li class="abcd">
//       <img
//         class="main-render__image"
//         src="${poster_path}"
//         alt="film poster"
//         loading="lazy"
//         width="395"
//         height="634"
//       />
//       <div class="main-render__description">
//         <h2 class="main-render__name">${original_title}</h2>
//         <p class="main-render__genre">
//           ${original_title}
//           <span class="main-render__year">${release_date}</span>
//           <span class="main-render__vote">>${vote_average}</span>

//         </p>
//       </div>
//     </li>`;
// }
// .join('');

// export default './js/LSW';
