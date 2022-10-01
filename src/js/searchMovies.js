import { fetchSearchAnyMovie } from './ApiService';
import { refs } from './refs';
import { renderGalleryCardsMovies} from './renderGalleryCardsMovies'

refs.searchForm.addEventListener('submit', onGalleryMoviesFormSubmit);

async function onGalleryMoviesFormSubmit(e) {
    e.preventDefault();

    let query = e.target.elements.searchQuery.value.trim();
    
    refs.mainRenderList.innerHTML = '';

    page = 1;

    if (query === "") {
        return;
    }

    const response = await fetchSearchAnyMovie(query);
    console.log(response.data)
    
    if (response.data.total_pages === 0) {
        refs.searchTextBox.innerHTML = `Search result not successful. Enter the correct movie name and `;
    }

    refs.mainRenderList.innerHTML = renderGalleryCardsMovies(response.data.results);


}