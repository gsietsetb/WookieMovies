import {Movie} from '../screens/MovieDetails';

export const BASE_URL = 'https://wookie.codesubmit.io/movies';
export const SEARCH_URL = 'https://wookie.codesubmit.io/movies';
export const bearerHeader = 'Authorization: Bearer Wookie2019';

export const fetchConfig: RequestInit = {
  method: 'GET',
  headers: new Headers({Authorization: 'Bearer Wookie2019'}),
};

export const toggleList = (list: [], name: string) =>
  list.includes(name) ? list.filter(c => c !== name) : list.push(name);

export const sortByLength = (list: Object) =>
  Object.keys(list).sort((a, b) => (list[a].length > list[b].length ? -1 : 1));

export const groupByTopic = (list: Movie[], topic = 'genres') =>
  list.reduce((accum: Object, currentMovie: Movie) => {
    currentMovie[topic].map((currentKind: string) => {
      if (accum.hasOwnProperty(currentKind)) {
        accum[currentKind].push(currentMovie);
      } else {
        accum = {...accum, [currentKind]: [currentMovie]};
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
