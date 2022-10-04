import { fetchSearchAnyMovie, fetchGenresOfMovie } from './ApiService';
import { refs } from './refs';
import { renderGalleryCardsMovies, fillMovieGenres, fillMovieYear} from './movieHelpers'
import pagination from'./castom_pagination';

const paginationEl = document.getElementById('tui-pagination-container')

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
    if (response.data === null) {
        refs.searchTextBox.innerHTML = `Search result not successful. Enter the correct movie name.`;
        paginationEl.style.display = 'none';
        return;
    }

    if (response.data.total_pages === 0) {
        refs.searchTextBox.innerHTML = `Search result not successful. Enter the correct movie name.`;
        paginationEl.style.display = 'none';
        return;
    }
    
    refs.searchTextBox.innerHTML = '';
    paginationEl.style.display = 'block';

    const genres = await fetchGenresOfMovie();

    response.data.results.forEach(movie => {
        fillMovieGenres(movie, genres.data.genres);
        fillMovieYear(movie);
    });
    pagination(response.data.page, response.data.total_pages)


    refs.mainRenderList.innerHTML = renderGalleryCardsMovies(response.data.results);
    
}
