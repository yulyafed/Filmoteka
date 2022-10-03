import { refs } from './refs';
import './ApiService';
import { fetchMovieById } from './ApiService';
import { init } from './set-to-watched';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const posterUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

refs.mainRenderList.addEventListener('click', addClassHidden);
refs.modalCloseBtn.addEventListener('click', toggleClassHidden);
refs.mainRenderList.addEventListener('click', openBackDrop);
refs.modalCloseBtn.addEventListener('click', cleanBackDrop);
window.addEventListener('keydown', modalKeyDown);
refs.backdrop.addEventListener('click', closeModal);

function toggleClassHidden(event) {
  event.preventDefault();
  refs.backdrop.classList.toggle('is-hidden');
}
function openBackDrop(event) {
  event.preventDefault();

  Loading.dots({
  svgColor: '#ff6b02',
});

    if (event.target.parentNode.nodeName !== "A") {
      return
    }

  const currentLink = event.target.closest('a');
  const currentId = currentLink.getAttribute('data-id');
  fetchMovieById(currentId).then(res => {
    const result = res.data;
    Loading.remove(1000);
    console.log("done")
    refs.modalInfoBox.insertAdjacentHTML(
      'beforeend',
      createBackDropMarkUp(result)
    );
    init();
  });
}
function createBackDropMarkUp(result) {
  const genresArray = [];
  const genres = result.genres.map(genre => {
    genresArray.push(genre.name);
  });

  const genreList = genresArray.join(', ');
  const markUp = `<div class="modal__info">
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${result.poster_path
    }" alt="poster" class="modal__poster-img">
    <div class="modal__text-box" id=${result.id}>

        <h1 class="modal__top-text">${result.original_title || result.original_name
    }</h1>

        <table class="modal__table">
            <tr class="modal__table-item">
                <th class="modal__table-top">Vote / Votes</th>
                <th class="modal__table-text"><span class="vote">${result.vote_average
    }</span>   /   ${result.vote_count}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Popularity</th>
                <th class="modal__table-text">${result.popularity}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Original Title</th>
                <th class="modal__table-text">${result.original_title}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Genre</th>
                <th class="modal__table-text">${genreList}</th>
            </tr>
        </table>
        <p class="modal__text modal__text--header">About</p>
        <p class="modal__text">${result.overview}</p>
        <ul class="modal__btn-list">
            <li class="modal__btn-item"><button class="modal__choice-btn modal__choice-btn--watched js-watched">ADD TO WATCHED</button></li>
            <li class="modal__btn-item"><button class="modal__choice-btn modal__choice-btn--queue js-queue">ADD TO QUEUE</button>
            </li>
        </ul>
    </div>`;
  return markUp;
}
function cleanBackDrop() {
  refs.modalInfoBox.innerHTML = '';
}
function modalKeyDown(event) {
  if (!refs.backdrop.classList.contains('is-hidden')) {
    if (event.code === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
      cleanBackDrop();
    }
  }
}
function closeModal(event) {
  event.preventDefault();
  if (event.target === refs.backdrop) {
    refs.backdrop.classList.add('is-hidden');
    cleanBackDrop();
  }
}

function addClassHidden(event) {
  event.preventDefault()
  if (event.target.parentNode.nodeName !== "A") {
    return
  }
  refs.backdrop.classList.toggle('is-hidden');
}


export {
  toggleClassHidden,
  openBackDrop,
  cleanBackDrop,
  modalKeyDown,
  closeModal,
  addClassHidden
};

import { getToBtns } from "./component/getToBtns"
refs.mainRenderList.addEventListener("click", getToBtns)
