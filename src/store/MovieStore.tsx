import {makeAutoObservable} from 'mobx';
import _ from 'lodash';
import {groupByTopic, toggleList} from '../utils/data';
import Toast from 'react-native-toast-message';
import {CategoryMap, Movie, MoviesList} from './MovieTypes';

export const searchKeysDefault = ['title', 'cast'];

export interface MovieStore {
  toggleNetworkSearch: () => void;
  readonly favorites: MoviesList;
  toggleCastFilter: (key: string) => void;
  networkSearch: boolean;
  setSearchMovies: (newMovies: MoviesList) => void;
  toggleCategoryFilter: (key: string) => void;
  readonly matchingSearch: MoviesList;
  castFilter: string[];
  setSearch: (pattern: string, keys?: string[]) => void;
  readonly matchingFilters: MoviesList;
  readonly matchingCategories: [string, MoviesList][];
  movies: MoviesList;
  moviesSearch: MoviesList;
  clearSearch: () => void;
  readonly cast: CategoryMap;
  search: string;
  categoryFilter: string[];
  toggleFavorite: (currentId: string) => void;
  readonly favBadge: number;
  readonly noResults: boolean;
  setMovies: (movies: MoviesList) => void;
  readonly categories: CategoryMap;
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
    setMovies: (backendMovies: MoviesList) => {
      store.movies = backendMovies;
    },
    setSearchMovies: (backendMovies: MoviesList) => {
      store.moviesSearch = backendMovies;
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
      store.castFilter = [];
      store.categoryFilter = [];
    },

    get matchingSearch(): MoviesList {
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
      return _.isEmpty(store.movies);
    },

    get categories() {
      return store.matchingFilters ? groupByTopic(store?.matchingFilters) : {};
    },

    get cast() {
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
        : store.matchingSearch.filter((current: Movie) => {
            let found = false;
            found = store.castFilter.some((actor: string) =>
              _.includes(current.cast, actor),
            );
            return found;
          });
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
