import {makeAutoObservable} from 'mobx';
import _ from 'lodash';
import {groupByTopic, toggleList} from '../utils/data';
import {Movie, MoviesList} from '../screens/MovieDetails';
import Toast from 'react-native-toast-message';

export const searchKeysDefault = ['title', 'cast'];

/** This could be used to dynamically create Filter by categories

 export const createFilterStore = (store: {
  categories: {[s: string]: unknown} | ArrayLike<unknown>;
}) => {
  const filterStore = makeAutoObservable({
    curentFilters: [],
    toggleFilters: (key: string) => {
      filterStore.curentFilters = toggleList(filterStore.curentFilters, key);
    },

    get matchingMovies(): Object {
      return _.isEmpty(filterStore.curentFilters)
        ? Object.entries(store.categories)
        : Object.entries(store.categories).filter(([key]) =>
            filterStore.curentFilters.includes(key),
          );
    },
    get noFilters(): boolean {
      return _.isEmpty(filterStore.curentFilters);
    },
  });

  return filterStore;
};*/

export interface MovieStore {
  toggleNetworkSearch: () => void;
  readonly favorites: Movie[];
  toggleCastFilter: (key: string) => void;
  networkSearch: boolean;
  setSearchMovies: (newMovies: MoviesList) => void;
  toggleCategoryFilter: (key: string) => void;
  readonly matchingSearch: Array<Movie>;
  castFilter: any[];
  setSearch: (pattern: string, keys?: string[]) => void;
  readonly matchingFilters: Array<Movie>;
  readonly matchingCategories: object;
  movies: Movie[];
  moviesSearch: Movie[];
  clearSearch: () => void;
  readonly cast: object;
  search: string;
  categoryFilter: any[];
  toggleFavorite: (currentId: string) => void;
  readonly favBadge: number;
  readonly noResults: boolean;
  setMovies: (movies: MoviesList) => void;
  readonly categories: object;
  searchKeys: string[];
}

export const createMovieStore = () => {
  let store: MovieStore;
  store = makeAutoObservable({
    movies: [],
    moviesSearch: [],

    /**Network search to external API */
    networkSearch: false,
    toggleNetworkSearch: () => {
      store.networkSearch = !store.networkSearch;
    },
    setMovies: (movies: MoviesList) => {
      store.movies = movies.movies;
    },
    setSearchMovies: (newMovies: MoviesList) => {
      store.moviesSearch = newMovies.movies;
    },

    /**Internal Search @networkSearch = false */
    search: '',
    searchKeys: searchKeysDefault,
    setSearch: (pattern: string, keys = searchKeysDefault) => {
      store.search = pattern;
      store.searchKeys = keys;
    },
    clearSearch: () => {
      store.search = '';
    },

    get matchingSearch(): Array<Movie> {
      return _.isEmpty(store.search)
        ? store.movies
        : store.networkSearch
        ? store.moviesSearch
        : store.movies.filter((current: Movie) =>
            current.title.toLowerCase().includes(store.search.toLowerCase()),
          );
      /*todo add multiple search keys:
             store.searchKeys.map(
             (currKey: keyof Movie) =>
               current[currKey] &&
               typeof current[currKey] === 'string' &&
               current[currKey]
                 .toLowerCase()
                 .includes(store.search.toLowerCase()),
           ),*/
    },

    get noResults(): boolean {
      return _.isEmpty(store.matchingCategories);
    },

    get categories() {
      return store.matchingFilters ? groupByTopic(store?.matchingFilters) : {};
    },

    get cast(): object {
      return store.matchingSearch
        ? groupByTopic(store?.matchingSearch, 'cast')
        : {};
    },

    /** Filters*/
    /* Cast Filter*/
    castFilter: [],
    toggleCastFilter: (key: string) => {
      store.castFilter = toggleList(store.castFilter, key);
    },

    get matchingFilters() {
      return _.isEmpty(store.castFilter)
        ? store.matchingSearch
        : store.matchingSearch.filter(
            (current: Movie) => {
              let found = false;
              _.includes(current.cast, store.castFilter[0]);
            } /*store.castFilter.map(actor =>*/,
          );
    },

    /* Category filter*/
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
      let action = '➕ Added to';
      if (store.movies[pos].hasOwnProperty('favorite')) {
        store.movies[pos].favorite = !store.movies[pos].favorite;
        action = '➖ Removed from';
      } else {
        store.movies[pos] = Object.assign(store.movies[pos], {
          favorite: true,
        });
      }
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: '❤️ Favorite -' + store.movies[pos].title,
        text2: action + ' favorites movies 🎬',
      });
    },
    get favorites() {
      return _.filter(store.movies, ({favorite}) => !!favorite);
    },
    get favBadge(): number {
      return store.favorites.length;
    },
  });
  return store;
};

export type TStore = ReturnType<typeof createMovieStore>;
