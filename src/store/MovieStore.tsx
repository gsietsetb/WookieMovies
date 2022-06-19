import {makeAutoObservable} from 'mobx';
import _ from 'lodash';
import {flattenByKey, groupByGenre, matchingKeyArrays} from '../utils/data';
import {MoviesList} from '../screens/MovieDetails';

export const createMovieStore = () => {
  const store = makeAutoObservable({
    movies: [],
    setMovies: (movies: MoviesList) => {
      store.movies = movies.movies;
    },

    search: '',
    setSearch: (pattern: string) => {
      store.search = pattern;
    },
    clearSearch: () => {
      store.search = '';
    },

    filters: [],
    get categories() {
      return store.movies ? groupByGenre(store?.movies) : {};
    },

    get favorites() {
      return _.filter(store.currFilters, ({favorite}) => !!favorite);
    },

    get matchingFilters() {
      return _.filter(store.currFilters, ({marked}) => !!marked);
    },

    get hasMatchingFilters() {
      return !_.isEmpty(store.matchingFilters);
    },
    get currentHighlights() {
      return store.matchingList
        .filter(({highlight}) => !!highlight)
        .slice(0, 6);
    },

    get matchingList() {
      return !_.isEmpty(store.matchingFilters)
        ? store.user.highlights.filter(
            ({technologies}) =>
              technologies &&
              matchingKeyArrays(
                flattenByKey(technologies),
                flattenByKey(store.matchingFilters),
              ),
          )
        : store.user.highlights;
    },
  });
  return store;
};

export type TStore = ReturnType<typeof createMovieStore>;
