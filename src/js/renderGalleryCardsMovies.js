export function renderGalleryCardsMovies(arr) {
    const markup = arr.reduce((acc, obj) => acc + `
    <li class="main-render__item">
        <a href="#" class="main-render__link" data-id="${obj.id}">
        <div class="main-render__image-box">
          <img class="main-render__image"
          src="${obj.poster_path ? `https://image.tmdb.org/t/p/w500${obj.poster_path}` : obj.imgPlaceholder}"
          alt="${obj.original_title}" 
          data-id="${obj.id}">
          </div>
          <div class="main-render__discription">
          <h2 class="main-render__title" data-id="${obj.id}">
            ${obj.original_title}
          </h2>
          <p class="main-render__text" data-id="${obj.id}">${obj.genre_ids} | ${obj.release_date}</p>
          </div>
        </a>
      </li>`, '');
    return markup;
}