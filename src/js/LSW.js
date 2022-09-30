const addToWatched = document.querySelector('.addWatchMy');
const myLibraryLink = document.querySelector('.watched');
const WATCHED_MOVIES = 'watched_list';

const movie = { id: Date.now(), title: 'Armagedon', video: true }; // об'єкт картки фільму

// startMovieList();

addToWatched.addEventListener('click', onAddToWatchBtn);

function onAddToWatchBtn() {
  addTaskToLocalStorage(movie);
  myLibraryLink.insertAdjacentHTML('beforeend', renderTask(movie));
}

// function startMovieList () {
//   const tasks = getTaskFromLocalStorage();
//   if (!tasks) {
//     return;
//   }
// myLibraryLink.insertAdjacentHTML('beforeend', renderTask(JSON.parse(tasks)));
// }

// ____________________________________SERVIS_________________________________________//

function addTaskToLocalStorage(movie) {
  const parsedLocalStorage = getTaskFromLocalStorage(WATCHED_MOVIES);
  console.log(parsedLocalStorage);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  returnTheSameMovie(listOfMovies, movie);
  localStorage.setItem(WATCHED_MOVIES, JSON.stringify(listOfMovies));
}

export function getTaskFromLocalStorage(key = WATCHED_MOVIES) {
  return localStorage.getItem(key);
}

function returnTheSameMovie(listOfMovies, movie) {
  listOfMovies.push(movie);
}

// ___________________________________MARKUP__________________________________________

export function renderTask({ id, title, video }) {
  return `<li>
                <p class="text">${id}</p>
                <p class="text">${title}</p>
                <p class="text">${video}</p>
            </li>`;
}
// .join('');

// export default './js/LSW';
