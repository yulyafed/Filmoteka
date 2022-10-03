import './ApiService';
import { fetchMovieById } from './ApiService';
import './openModal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const WATCHED_MOVIES = 'watched_list';
const QUEUE_MOVIES = 'queue_list';

function isAuthenticated() {
  const currentUser =
    window.authenticationService && window.authenticationService.currentUser;
  return !!currentUser;
}

function onWatched(evt) {
  if (!isAuthenticated()) {
    // alert('Your are not allowed to perform this action');
    Notify.failure('Sorry, Your are not allowed to perform this action.');
    return;
  }
  const div = evt.target.closest('div');
  const id = +div.getAttribute('id');

  if (evt.target.textContent === 'ADD TO WATCHED') {
    getInfo(id, WATCHED_MOVIES);
    evt.target.textContent = 'REMOVE FROM WATCHED';
    evt.target.setAttribute('data-modBtn', 'addToWatchedBtn');
  } else {
    evt.target.textContent = 'ADD TO WATCHED';
    evt.target.removeAttribute('data-modBtn');
    removeFromLocalStorage(WATCHED_MOVIES, id);
  }
}

function onQueue(evt) {
  if (!isAuthenticated()) {
    // alert('Your are not allowed to perform this action');
    Notify.failure('Sorry, Your are not allowed to perform this action.');
    return;
  }
  const div = evt.target.closest('div');
  console.log(div);
  const id = +div.getAttribute('id');
  console.log(id);

  if (evt.target.textContent === 'ADD TO QUEUE') {
    getInfo(id, QUEUE_MOVIES);
    evt.target.textContent = 'REMOVE FROM QUEUE';
    evt.target.setAttribute('data-modBtn', 'addToQueuedBtn');
  } else {
    evt.target.textContent = 'ADD TO QUEUE';
    evt.target.removeAttribute('data-modBtn');
    removeFromLocalStorage(QUEUE_MOVIES, id);
  }
}

function removeFromLocalStorage(key, id) {
  const parsedLocalStorage = getTaskFromLocalStorage(key);
  console.log(parsedLocalStorage);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  console.log(id);
  console.log(listOfMovies);
  let idx = listOfMovies.findIndex(film => film.id === id);
  listOfMovies.splice(idx, 1);
  localStorage.setItem(key, JSON.stringify(listOfMovies));
  Notify.failure(`You have removed this movie from your library`);
}

function getInfo(id, key) {
  fetchMovieById(id).then(res => {
    const info = res.data;
    console.log(info);
    addToLocalStorage(key, info);
  });
}

export function init() {
  const addWatched = document.querySelector('.js-watched');
  const addQueue = document.querySelector('.js-queue');
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
    Notify.success(`Congratulation! You have this movie in your library`);
    return listOfMovies;
  }
}

function getTaskFromLocalStorage(key) {
  return localStorage.getItem(key);
}
