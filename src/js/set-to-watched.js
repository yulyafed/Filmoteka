import './ApiService';
import { fetchMovieById } from './ApiService';
import './openModal';

const WATCHED_MOVIES = 'watched_list';
const QUEUE_MOVIES = 'queue_list';

function isAuthenticated() {
  const currentUser =
    window.authenticationService && window.authenticationService.currentUser;
  return !!currentUser;
}

function onWatched(evt) {
  if (!isAuthenticated()) {
    alert('Your are not allowed to perform this action');
    return;
  }

  const div = evt.target.closest('div');
  const id = div.getAttribute('id');

  if (evt.target.textContent === 'ADD TO WATCHED') {
    getInfo(id, WATCHED_MOVIES);
    evt.target.textContent = 'REMOVE FROM WATCHED';
  } else {
    evt.target.textContent = 'ADD TO WATCHED';
    removeFromLocalStorage(WATCHED_MOVIES, id);
  }
}

function onQueue(evt) {
  if (!isAuthenticated()) {
    alert('Your are not allowed to perform this action');
    return;
  }

  const div = evt.target.closest('div');
  const id = div.getAttribute('id');

  if (evt.target.textContent === 'ADD TO QUEUE') {
    getInfo(id, QUEUE_MOVIES);
    evt.target.textContent = 'REMOVE FROM QUEUE';
  } else {
    evt.target.textContent = 'ADD TO QUEUE';
    removeFromLocalStorage(QUEUE_MOVIES, id);
  }
}

function removeFromLocalStorage(key, id) {
  const parsedLocalStorage = getTaskFromLocalStorage(key);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  const idx = listOfMovies.findIndex(film => film.id === id);
  listOfMovies.splice(idx, 1);
  localStorage.setItem(key, JSON.stringify(listOfMovies));
}

function getInfo(id, key) {
  fetchMovieById(id).then(res => {
    const info = res.data;
    addToLocalStorage(key, info);
  });
}

export function init() {
  const addWatched = document.querySelector('.js-watched');
  const addQueue = document.querySelector('.js-queue');
  console.log(addWatched);

  addWatched.addEventListener('click', onWatched);
  addQueue.addEventListener('click', onQueue);
}

function addToLocalStorage(key, movieObject) {
  const parsedLocalStorage = getTaskFromLocalStorage(key);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  const idMovie = movieObject.id;
  const index = listOfMovies.findIndex(film => film.id === idMovie);
  if (index === -1) {
    listOfMovies.push(movieObject);
    localStorage.setItem(key, JSON.stringify(listOfMovies));

    return listOfMovies;
  }
}
function getTaskFromLocalStorage(key) {
  return localStorage.getItem(key);
}
