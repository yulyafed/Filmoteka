const addQueueChangeClassBtn = document.querySelector(
  'button[data-modBtn="addToQueueBtn"]'
);
const QUEUE_MOVIES = 'queue_list';

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
// ____________________________CHANGE BTN_______________________________________
getTextContent();

addQueueChangeClassBtn.addEventListener('click', onClassAddWatched);

function getTextContent() {
  const parsedLocalStorage = getTextContentLocalStorage(QUEUE_MOVIES);
  const listOfMovies = JSON.parse(parsedLocalStorage);
  // console.log(movieObject);
  const idMovie = movieObject.id;
  const index = listOfMovies.findIndex(film => film.id === idMovie);
  if (index !== -1) {
    addQueueChangeClassBtn.textContent = 'REMOVE FROM QUEUE';
  } else addQueueChangeClassBtn.textContent = 'ADD TO QUEUE';
}

function getTextContentLocalStorage(key = QUEUE_MOVIES) {
  return localStorage.getItem(key);
}

function onClassAddWatched() {
  if (addQueueChangeClassBtn.textContent === 'ADD TO QUEUE') {
    addQueueChangeClassBtn.textContent = 'REMOVE FROM QUEUE';
    addTaskToLocalStorage(movieObject);
  } else if (addQueueChangeClassBtn.textContent === 'REMOVE FROM QUEUE') {
    addQueueChangeClassBtn.textContent = 'ADD TO QUEUE';
    RemoveFromWatchedBtn(movieObject);
  }
}
// ____________________________________SERVIS_________________________________________//

function addTaskToLocalStorage(movieObject) {
  const parsedLocalStorage = getTaskFromLocalStorage(QUEUE_MOVIES);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  listOfMovies.push(movieObject);
  localStorage.setItem(QUEUE_MOVIES, JSON.stringify(listOfMovies));
  return listOfMovies;
}

function RemoveFromWatchedBtn() {
  const parsedLocalStorage = getTaskFromLocalStorage(QUEUE_MOVIES);
  const listOfMovies = JSON.parse(parsedLocalStorage);
  const idMovie = movieObject.id;
  const index = listOfMovies.findIndex(film => film.id === idMovie);
  if (index !== -1) {
    listOfMovies.splice(index, 1);
  }
  localStorage.setItem(QUEUE_MOVIES, JSON.stringify(listOfMovies));
  return listOfMovies;
}

export function getTaskFromLocalStorage(key = QUEUE_MOVIES) {
  return localStorage.getItem(key);
}