import { refs } from './refs'
import './ApiService'
import { fetchMovieById } from './ApiService'
const posterUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

refs.mainRenderList.addEventListener("click", toggleClassHidden)
refs.modalCloseBtn.addEventListener("click", toggleClassHidden)
refs.mainRenderList.addEventListener("click", openBackDrop)
refs.modalCloseBtn.addEventListener("click", cleanBackDrop)
window.addEventListener("keydown", modalKeyDown)
refs.backdrop.addEventListener("click", closeModal)

function toggleClassHidden(event) {
    event.preventDefault()
    refs.backdrop.classList.toggle("is-hidden")
}
function openBackDrop(event) {
    event.preventDefault()
    const currentLink = event.target.closest("a")
    const currentId = currentLink.getAttribute("id")
    fetchMovieById(currentId)
    .then(data => {
        refs.modalInfoBox.insertAdjacentElement("beforeend", createBackDropMarkUp(data))
    })
}
function createBackDropMarkUp(data) {
    const genresArray = []
    const genres = data.genres.map(genre => {
        genresArray.push(genre.name)
    })
    const genreList = genreArray.join(", ")
    const markUp = `<div class="modal__info">
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}" alt="poster" class="modal__poster-img">
    <div class="modal__text-box">
        <h1 class="modal__top-text">${data.original_title || data.original_name
            }</h1>
        <table class="modal__table">
            <tr class="modal__table-item">
                <th class="modal__table-top">Vote / Votes</th>
                <th class="modal__table-text"><span class="vote">${data.vote_average}</span>/${data.vote_count}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Popularity</th>
                <th class="modal__table-text">${data.popularity}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Original Title</th>
                <th class="modal__table-text">${data.original_title}</th>
            </tr>
            <tr class="modal__table-item">
                <th class="modal__table-top">Genre</th>
                <th class="modal__table-text">${genreList}</th>
            </tr>
        </table>
        <p class="modal__text modal__text--header">About</p>
        <p class="modal__text">${data.overview}</p>
        <ul class="modal__btn-list">
            <li class="modal__btn-item"><button class="modal__choice-btn modal__choice-btn--watched">add to
                    Watched</button></li>
            <li class="modal__btn-item"><button class="modal__choice-btn modal__choice-btn--queue">add to queue</button>
            </li>
        </ul>
    </div>
</div>`
    return markUp
}
function cleanBackDrop() {
    refs.modalInfoBox.innerHTML = ""
}
function modalKeyDown(event) {
    if (!refs.backdrop.classList.contains('is-hidden')) {
        if (event.code === 'Escape') {
            refs.backdrop.classList.add('is-hidden')
            cleanBackDrop()
        }
    }
}
function closeModal(event) {
    event.preventDefault() 
    if (event.target === refs.backdrop) {
        refs.backdrop.classList.add('is-hidden')
            cleanBackDrop()
    }
}