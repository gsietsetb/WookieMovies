import React, {useEffect} from 'react';
import {Alert, FlatList, ScrollView, Text, View} from 'react-native';
import {useFetch} from 'usehooks-ts';
import {BASE_URL, fetchConfig, sortByLength} from '../utils/data';
import C from 'consistencss';
import {Movie, MoviesList} from './MovieDetails';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../comp/MovieCard';
import {Routes} from '../routes';
import SearchBar from '../comp/SearchBar';
import {useStores} from '../store/MovieProvider';
import Pill from '../comp/Pill';
import {useObserver} from 'mobx-react';
import EmptyScreen from '../comp/EmptyScreen';

export const Home: React.FC = () => {
  const store = useStores();
  const {data: moviesList, error} = useFetch<MoviesList>(BASE_URL, {
    ...fetchConfig,
  });
  const {navigate} = useNavigation();

  if (error) {
    Alert.alert('Fetching Error', 'Got an Error fetching movies...' + error);
  }

  /**Update stores when fetching data*/
  useEffect(() => {
    if (store && moviesList) {
      store?.setMovies(moviesList);
    }
  }, [store, moviesList]);

  const openDetails = (item: Movie) =>
    navigate(Routes.MOVIE_DETAILS, {movie: item});

  return useObserver(() => (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.bgDark]}>
      {store && <SearchBar number={store?.matchingSearch.length} />}

      {store?.categories && (
        <FlatList
          data={sortByLength(store.categories)}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <Pill
              name={item}
              number={store?.categories[item].length}
              /*onPress={() => store?.toggleCategoryFilter(item)}*/
            />
          )}
        />
      )}
      {store?.cast && (
        <FlatList
          data={sortByLength(store.cast)}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <Pill name={item} number={store?.cast[item].length} />
          )}
        />
      )}

      {store && store.noResults ? (
        <EmptyScreen
          search={store.search}
          onClear={() => store?.clearSearch()}
        />
      ) : (
        store?.categories &&
        Object.entries(store.categories).map(([key, genreMovies]) => (
          <View style={[C.pl4, C.my4]}>
            <Text style={[C.weightBold, C.textWhite, C.font4, C.mb4]}>
              {key}
            </Text>
            <FlatList
              data={genreMovies}
              horizontal
              keyExtractor={({title}) => title}
              renderItem={({item}) => (
                <MovieCard
                  movie={item}
                  onLongPress={() => store?.toggleFavorite(item.id)}
                  onPress={() => openDetails(item)}
                />
              )}
            />
          </View>
        ))
      )}
    </ScrollView>
  ));
};
