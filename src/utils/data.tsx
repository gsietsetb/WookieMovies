import _ from 'lodash';
import {CategoryMap, Movie, MoviesList} from '../store/MovieTypes';

const fetch = require('node-fetch');

export const BASE_URL = 'https://wookie.codesubmit.io/movies';
export const SEARCH_URL = 'https://wookie.codesubmit.io/movies?q=';

export const fetchConfig: RequestInit = {
  method: 'GET',
  headers: new fetch.Headers({Authorization: 'Bearer Wookie2019'}),
};

export const toggleList = (list: string[], name: string) => {
  _.includes(list, name) ? _.remove(list, c => c === name) : list.push(name);
  return list;
};

export const isFilterSelected = (list: string[], name: string) =>
  _.isEmpty(list) ? true : _.includes(list, name);

export const sortByLength = (list: CategoryMap) =>
  Object.keys(list).sort((a, b) => (list[a].length > list[b].length ? -1 : 1));

export const groupByTopic = (
  list: MoviesList,
  topic: keyof CategoryMap = 'genres',
) =>
  list.reduce((accum: CategoryMap, currentMovie: Movie) => {
    // @ts-ignore
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
