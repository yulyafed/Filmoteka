import {toggleClassHidden, openBackDrop, cleanBackDrop, modalKeyDown, closeModal} from "./openModal"
const libraryMainList = document.querySelector("[data-film-modal-open]")
const watchedBTN = document.querySelector(".watched-btn")
const queueBTN = document.querySelector(".queue-btn")
libraryMainList.addEventListener("click", openBackDrop)
libraryMainList.addEventListener("click", toggleClassHidden)
window.addEventListener("load", showWatchedList)
queueBTN.addEventListener("click", openOqueueList)
watchedBTN.addEventListener("click", openWathedList)


function createLibraryMarkup() {
    const markup = data.map(({ id, poster_path, original_title, name, genres, release_date,  first_air_date}) => {
        const item = `<li class="main-render__item">
        <a href="#" class="main-render__link" data-id="${id}">
        <div class="main-render__image-box">
            <img class="main-render__image"
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            alt="${original_title || name}" 
            data-id="${id}">
            </div>
            <div class="main-render__discription">
            <h2 class="main-render__title" data-id="${id}">
            ${original_title || name}
            </h2>
            <p class="main-render__text" data-id="${id}">${genres} | ${release_date || first_air_date}</p>
            </div>
        </a>
        </li>`
        return item
    }).join("")
    return markup
}
function showWatchedList(evt) {
    evt.preventDefault()

    const watched = localStorage.getItem("watched")
    const watchedFilms = watched ? JSON.parse(watched) : []

    if (watchedFilms.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of watched movies is empty.</p>
            </li>`
    }
    else {
        libraryMainList.insertAdjacentHTML("beforeend", createLibraryMarkup)
    }
}
function showQueuedList(evt) {
    evt.preventDefault()

    const queue = localStorage.getItem("queue")
    const queueFilms = queue ? JSON.parse(queue) : []

    if (queueFilms.length === 0) {
        libraryMainList.innerHTML = `<li class="api-error">
            <p class="api-error__desc">The list of queued movies is empty.</p>
            </li>`
    }
    else {
        libraryMainList.insertAdjacentHTML("beforeend", createLibraryMarkup)
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