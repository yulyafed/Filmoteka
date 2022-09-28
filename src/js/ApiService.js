import axios from 'axios';

const API_KEY = 'fe8296f47fdee638ac9cbbf0db61e69d'
const BASE_URL = 'https://api.themoviedb.org/3'
const LANG = 'en-US'

//'searchMovie' - як я зрозумів, то треба робить якусть CONST з input.value чи щось таке
const fetchSearchAnyMovie = async (searchMovie, page) => {
  const response = await axios(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${searchMovie}&page=${page}&include_adult=false`);
  return response;
};

const fetchMovieById = async movieId => {
  const response = await axios(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANG}`);
  return response;
};

const fetchTrendMovies = async page => {
  const response = await axios(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${LANG}&page=${page}`);
  return response;
};
// const fetchGenresOfMovie = async () => {
//   const genres = await axios(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
//   return genres;
// };
