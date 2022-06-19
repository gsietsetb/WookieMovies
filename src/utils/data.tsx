import {Movie} from '../screens/MovieDetails';

export const BASE_URL = 'https://wookie.codesubmit.io/movies';
export const SEARCH_URL = 'https://wookie.codesubmit.io/movies';
export const bearerHeader = 'Authorization: Bearer Wookie2019';

export const fetchConfig: RequestInit = {
  method: 'GET',
  headers: new Headers({Authorization: 'Bearer Wookie2019'}),
};

export const groupByGenre = (list: Movie[]) =>
  list.reduce((accum: Object, currentMovie: Movie) => {
    currentMovie.genres.map((currentGenre: string) => {
      if (accum.hasOwnProperty(currentGenre)) {
        accum[currentGenre].push(currentMovie);
      } else {
        accum = {...accum, [currentGenre]: [currentMovie]};
      }
      return accum;
    });
    return accum;
  }, {});

export const toggleObjKey = (obj: Object, key: string) => {
  obj[key].marked = !obj[key].marked;
  return {...obj};
};

export const flattenByKey = (list: [], key = 'name') =>
  list.map(item => item[key]);
export const matchingKeyArrays = (arr1: [], arr2: []) =>
  arr1.some(r => arr2.includes(r));
