import axios from "axios"
import { toggleClassHidden, openBackDrop, cleanBackDrop, modalKeyDown, closeModal, addClassHidden } from "./openModal"
import { refs } from "./refs"
import {getToBtns} from "./component/getToBtns"
const libraryMainList = document.querySelector("[data-film-modal-open]")
const watchedBTN = document.querySelector(".watched-btn")
const queueBTN = document.querySelector(".queue-btn")
libraryMainList.addEventListener("click", openBackDrop)
libraryMainList.addEventListener("click", addClassHidden)
window.addEventListener("load", showWatchedList)
queueBTN.addEventListener("click", openOqueueList)
watchedBTN.addEventListener("click", openWathedList)
libraryMainList.addEventListener("click", getToBtns)


function createLibraryMarkup(film) {

    const genresList = []
    const genreList = film.genres.map(genre => {
        genresList.push(genre.name)
    })
    const genres = genresList.join(', ')
    
    const date = film.release_date.slice(0, 4) || film.first_air_date.slice(0, 4)
    console.log(date);

    const markup = `<li class="main-render__item">
        <a href="#" class="main-render__link" data-id="${film.id}">
            <img class="main-render__image"
            src="https://image.tmdb.org/t/p/w500${film.poster_path}"
            alt="${film.original_title || film.name}" 
            data-id="${film.id}">
            <h2 class="main-render__title" data-id="${film.id}">
            ${film.original_title || film.name}
            </h2>
            <p class="main-render__text" data-id="${film.id}">${genres} | ${date}</p>
        </a>
        </li>`
    return markup
}
function showWatchedList(evt) {
    evt.preventDefault()

    const watched = localStorage.getItem("watched_list")
    const watchedFilms = watched ? JSON.parse(watched) : []

    if (watchedFilms.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of watched movies is empty.</p>
            </li>`
    }
    else {
        watchedFilms.map(film => {
            libraryMainList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        })
        
    }
}
function showQueuedList(evt) {
    evt.preventDefault()

    const queue = localStorage.getItem("queue_list")
    const queueFilms = queue ? JSON.parse(queue) : []

    if (queueFilms.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of queued movies is empty.</p>
            </li>`
    }
    else {
        queueFilms.map(film => {
            libraryMainList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        })
    }
}
function openWathedList(evt) {
    evt.preventDefault()
    queueBTN.classList.remove("btn--active")
    watchedBTN.classList.add("btn--active")
    cleanLibrary()
    showWatchedList(evt)
}
function openOqueueList(evt) {
    evt.preventDefault()
    watchedBTN.classList.remove("btn--active")
    queueBTN.classList.add("btn--active")
    window.removeEventListener("load", showWatchedList)
    cleanLibrary()
    showQueuedList(evt)
}
function cleanLibrary() {
    libraryMainList.innerHTML = ""
}
refs.modalCloseBtn.addEventListener("click", closeAndClean)
function closeAndClean(evt) {
    const watchedList = JSON.parse(localStorage.getItem("watched_list"))
    const queuedList = JSON.parse(localStorage.getItem("queue_list"))

    if (watchedList.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of watched movies is empty.</p>
            </li>`
    }
    if (queuedList.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of watched movies is empty.</p>
            </li>`
    }
}