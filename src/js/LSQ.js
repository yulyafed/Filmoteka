const addToQueue = document.querySelector('.addQueueMy');
const myLibraryLink = document.querySelector('.queue');
const QUEUE_MOVIES = 'queue_list';

const movie = { id: 1, title: 'Armagedon', video: true }; // об'єкт картки фільму



addToQueue.addEventListener('click', onAddToQueueBtn);

function onAddToQueueBtn() {
  addCardToLocalStorage(movie);
  myLibraryLink.insertAdjacentHTML('beforeend', renderTask(movie));
}

// ____________________________________SERVIS_________________________________________//

function addCardToLocalStorage(movie) {
  const parsedLocalStorage = getCardFromLocalStorage(QUEUE_MOVIES);
  const listOfMovies = parsedLocalStorage ? JSON.parse(parsedLocalStorage) : [];
  returnTheSameMovie(listOfMovies, movie);
  localStorage.setItem(QUEUE_MOVIES, JSON.stringify(listOfMovies));
}
function returnTheSameMovie(listOfMovies, movie) {
  listOfMovies.push(movie);
}
export function getCardFromLocalStorage(key) {
  return localStorage.getItem(key);
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

// export default './js/LSQ';
