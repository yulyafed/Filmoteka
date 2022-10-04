import imgPlaceholder from '../images/imgPlaceholder.jpg'

export function renderGalleryCardsMovies(arr) {
    const markup = arr.reduce(
      (acc, obj) =>
        acc +
        `
    <li class="main-render__item">
        <a href="#" class="main-render__link" data-id="${obj.id}">
            <img class="main-render__image"
          src="${
            obj.poster_path
              ? `https://image.tmdb.org/t/p/w500${obj.poster_path}`
              : imgPlaceholder
          }"
          loading="lazy"
          alt="${obj.original_title}" 
          data-id="${obj.id}">
              <h2 class="main-render__title" data-id="${obj.id}">
            ${obj.original_title}
          </h2>
          <p class="main-render__text" data-id="${obj.id}">${obj.genres} | ${
          obj.year
        }</p>
        </a>
      </li>`,
      ''
    );
    return markup;
}

export function fillMovieGenres(movie, genres) {
  movie.genres = movie.genre_ids.map(id => {
    genres.forEach(obj => {
      if (obj.id === id) {
        id = obj.name;
      }
    });
    return id;
  });

  switch (true) {
    case movie.genres.length > 0 && movie.genres.length <= 2:
      movie.genres = movie.genres.join(', ');
      break;

    case movie.genres.length > 2:
      movie.genres[2] = 'Other';
      movie.genres = movie.genres.slice(0, 3).join(', ');
      break;

    default:
      movie.genres = 'Genre N/A';
      break;
  }
}

export function fillMovieYear(movie) {
  movie.year = movie.release_date ? movie.release_date.slice(0, 4) : 'Year N/A';
}
