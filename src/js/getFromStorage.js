import axios from "axios"
import { toggleClassHidden, openBackDrop, cleanBackDrop, modalKeyDown, closeModal, addClassHidden } from "./openModal"
import { refs } from "./refs"
import { getToBtns } from "./component/getToBtns"

const libraryMainList = document.querySelector("[data-film-modal-open")
const libraryWatchedList = document.querySelector(".watched-render")
const libraryQueuedList = document.querySelector(".queued-render")
const watchedBTN = document.querySelector(".watched-btn")
const queueBTN = document.querySelector(".queue-btn")

libraryWatchedList.addEventListener("click", openBackDrop)
libraryWatchedList.addEventListener("click", addClassHidden)
libraryWatchedList.addEventListener("click", getToBtns)

libraryQueuedList.addEventListener("click", openBackDrop)
libraryQueuedList.addEventListener("click", addClassHidden)
libraryQueuedList.addEventListener("click", getToBtns)

window.addEventListener("load", showWatchedList)
queueBTN.addEventListener("click", openQueueList)
watchedBTN.addEventListener("click", openWathedList)

libraryQueuedList.style.color = "red"

const watchedList = JSON.parse(localStorage.getItem("watched_list"))
const queuedList = JSON.parse(localStorage.getItem("queue_list"))

function createLibraryMarkup(film) {

    const genresList = []
    const genreList = film.genres.map(genre => {
        genresList.push(genre.name)
    })
    const genres = genresList.join(', ')
    
    const date = film.release_date.slice(0, 4) || film.first_air_date.slice(0, 4)

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
        libraryWatchedList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of watched movies is empty.</p>
            </li>`
    }
    watchedFilms.map(film => {
            libraryWatchedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        })
}
function showQueuedList(evt) {
    evt.preventDefault()

    const queue = localStorage.getItem("queue_list")
    const queueFilms = queue ? JSON.parse(queue) : []

    if (queueFilms.length === 0) {
        libraryQueuedList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of queued movies is empty.</p>
            </li>`
    }
    else {
        queueFilms.map(film => {
            libraryQueuedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        })
    }
}
function openWathedList(evt) {
    evt.preventDefault()
    libraryWatchedList.style.display = "grid"
    queueBTN.classList.remove("btn--active")
    watchedBTN.classList.add("btn--active")
    cleanQueuedList()
    showWatchedList(evt)
}
function openQueueList(evt) {
    evt.preventDefault()
    libraryQueuedList.style.display = "grid"
    watchedBTN.classList.remove("btn--active")
    queueBTN.classList.add("btn--active")
    window.removeEventListener("load", showWatchedList)
    cleanWatchedList()
    showQueuedList(evt)
}
function cleanWatchedList() {
    libraryWatchedList.style.display = "none"
    libraryWatchedList.innerHTML = ""
}
function cleanQueuedList() {
    
    libraryQueuedList.style.display = "none"
    libraryQueuedList.innerHTML = ""
}


refs.modalCloseBtn.addEventListener("click", restoreTheLibrary)
window.addEventListener('keydown', libraryModalKeyDown);
refs.backdrop.addEventListener('click', libraryCloseModal);

function restoreTheLibrary(evt) {
    evt.preventDefault()

    if (queueBTN.classList.contains("btn--active")) {
        const queue = localStorage.getItem("queue_list")
        const queueFilms = queue ? JSON.parse(queue) : []

        if (queueFilms.length === 0) {
            libraryQueuedList.innerHTML = `<li class="api-error">
                <p class="api-error__desc">The list of queued movies is empty.</p>
                </li>`
        }
        else {
            libraryQueuedList.innerHTML = ""
            queueFilms.map(film => {
                libraryQueuedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
            })
        }
    }
    if (watchedBTN.classList.contains("btn--active")) {
        const watched = localStorage.getItem("watched_list")
        const watchedFilms = watched ? JSON.parse(watched) : []

        if (watchedFilms.length === 0) {
            libraryWatchedList.innerHTML = `<li class="api-error">
                <p class="api-error__desc">The list of watched movies is empty.</p>
                </li>`
        }
        else {
            libraryWatchedList.innerHTML = ""
            watchedFilms.map(film => {
            libraryWatchedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        }) 
        }   
    }
}
function libraryCloseModal(event) {
  event.preventDefault();
  if (event.target === refs.backdrop) {
    if (queueBTN.classList.contains("btn--active")) {
        const queue = localStorage.getItem("queue_list")
        const queueFilms = queue ? JSON.parse(queue) : []

        if (queueFilms.length === 0) {
            libraryQueuedList.innerHTML = `<li class="api-error">
                <p class="api-error__desc">The list of queued movies is empty.</p>
                </li>`
        }
        else {
            libraryQueuedList.innerHTML = ""
            queueFilms.map(film => {
                libraryQueuedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
            })
        }
    }
    if (watchedBTN.classList.contains("btn--active")) {
        const watched = localStorage.getItem("watched_list")
        const watchedFilms = watched ? JSON.parse(watched) : []

        if (watchedFilms.length === 0) {
            libraryWatchedList.innerHTML = `<li class="api-error">
                <p class="api-error__desc">The list of watched movies is empty.</p>
                </li>`
        }
        else {
            libraryWatchedList.innerHTML = ""
            watchedFilms.map(film => {
            libraryWatchedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
        }) 
        }   
    }
    }
}
function libraryModalKeyDown(event) {
    console.log(event.code);
        if (event.code === 'Escape') {
            console.log("done");
            if (queueBTN.classList.contains("btn--active")) {
        const queue = localStorage.getItem("queue_list")
        const queueFilms = queue ? JSON.parse(queue) : []

        if (queueFilms.length === 0) {
            libraryQueuedList.innerHTML = `<li class="api-error">
                <p class="api-error__desc">The list of queued movies is empty.</p>
                </li>`
        }
        else {
            libraryQueuedList.innerHTML = ""
            queueFilms.map(film => {
                libraryQueuedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
            })
        }
            }
            if (watchedBTN.classList.contains("btn--active")) {
                const watched = localStorage.getItem("watched_list")
                const watchedFilms = watched ? JSON.parse(watched) : []

                if (watchedFilms.length === 0) {
                    libraryWatchedList.innerHTML = `<li class="api-error">
                        <p class="api-error__desc">The list of watched movies is empty.</p>
                        </li>`
                }
                else {
                    libraryWatchedList.innerHTML = ""
                    watchedFilms.map(film => {
                    libraryWatchedList.insertAdjacentHTML("beforeend", createLibraryMarkup(film))
                }) 
                }   
            }
        }
}