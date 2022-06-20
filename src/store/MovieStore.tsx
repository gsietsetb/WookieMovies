import {makeAutoObservable} from 'mobx';
import _ from 'lodash';
import {groupByTopic, toggleList} from '../utils/data';
import {Movie, MoviesList} from '../screens/MovieDetails';

export const createMovieStore = () => {
  const store = makeAutoObservable({
    movies: [],
    setMovies: (movies: MoviesList) => {
      store.movies = movies.movies;
    },

    /** Search*/
    search: '',
    setSearch: (pattern: string) => {
      store.search = pattern;
    },
    clearSearch: () => {
      store.search = '';
    },

    get matchingSearch() {
      return _.isEmpty(store.search)
        ? store.movies
        : store.movies.filter(({title}: Movie) =>
            title.toLowerCase().includes(store.search.toLowerCase()),
          );
    },

    get noResults() {
      return _.isEmpty(store.matchingSearch);
    },

    get categories() {
      return store.matchingSearch ? groupByTopic(store?.matchingSearch) : {};
    },

    get cast() {
      return store.matchingSearch
        ? groupByTopic(store?.matchingSearch, 'cast')
        : {};
    },

    /** Filters*/
    categoryFilter: [],
    toggleCategoryFilter: (key: string) => {
      store.categoryFilter = toggleList(store.categoryFilter, key);
    },

    get matchingCategories() {
      return _.isEmpty(store.categoryFilter)
        ? Object.entries(store.categories)
        : Object.entries(store.categories).filter(([key]) =>
            store.categoryFilter.includes(key),
          );
    },

    /** Favorites*/
    toggleFavorite: (currentId: string) => {
      const pos = _.findIndex(store.movies, ({id}) => id === currentId);
      if (store.movies[pos].hasOwnProperty('favorite')) {
        store.movies[pos].favorite = !store.movies[pos].favorite;
      } else {
        store.movies[pos] = Object.assign(store.movies[pos], {
          favorite: true,
        });
      }
    },
    get favorites() {
      return _.filter(store.movies, ({favorite}) => !!favorite);
    },
    get favBadge() {
      return store.favorites.length;
    },
  });
  return store;
};

export type TStore = ReturnType<typeof createMovieStore>;
