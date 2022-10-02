import { fetchSearchAnyMovie, fetchGenresOfMovie } from './ApiService';
import { refs } from './refs';
import { renderGalleryCardsMovies, fillMovieGenres, fillMovieYear} from './movieHelpers'

refs.searchForm.addEventListener('submit', onGalleryMoviesFormSubmit);

async function onGalleryMoviesFormSubmit(e) {
    e.preventDefault();

    let query = e.target.elements.searchQuery.value.trim();
    let page = 1;

    if (query === "") {
        return;
    }

    refs.mainRenderList.innerHTML = '';

    const response = await fetchSearchAnyMovie(query);
    if (response.data.total_pages === 0) {
        refs.searchTextBox.innerHTML = `Search result not successful. Enter the correct movie name and `;
        return;
    }

    const genres = await fetchGenresOfMovie();

    response.data.results.forEach(movie => {
        fillMovieGenres(movie, genres.data.genres);
        fillMovieYear(movie);
    });

    refs.mainRenderList.innerHTML = renderGalleryCardsMovies(response.data.results);
}
