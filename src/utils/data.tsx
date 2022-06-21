import {Movie} from '../screens/MovieDetails';
import _ from 'lodash';

export const BASE_URL = 'https://wookie.codesubmit.io/movies';
export const SEARCH_URL = 'https://wookie.codesubmit.io/movies?q=';

export const fetchConfig: RequestInit = {
  method: 'GET',
  headers: new Headers({Authorization: 'Bearer Wookie2019'}),
};

export const toggleList = (list: string[], name: string) => {
  _.includes(list, name) ? _.remove(list, c => c === name) : list.push(name);
  return list;
};

export const isFilterSelected = (list: string[], name: string) =>
  _.isEmpty(list) ? true : _.includes(list, name);

export const sortByLength = (list: object) =>
  Object.keys(list).sort((a, b) => (list[a].length > list[b].length ? -1 : 1));

export const groupByTopic = (list: Array<Movie>, topic = 'genres') =>
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

export const flattenByKey = (list: [], key = 'name') =>
  list.map(item => item[key]);
export const matchingKeyArrays = (arr1: [], arr2: []) =>
  arr1.some(r => arr2.includes(r));
