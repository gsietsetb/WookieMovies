import React, {useEffect} from 'react';
import {Alert, FlatList, ScrollView, Text, View} from 'react-native';
import {useFetch} from 'usehooks-ts';
import {BASE_URL, fetchConfig} from '../utils/data';
import C from 'consistencss';
import {Movie, MoviesList} from './MovieDetails';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../comp/MovieCard';
import {Routes} from '../routes';
import SearchBar from '../comp/SearchBar';
import {useStores} from '../store/MovieProvider';
import Pill from '../comp/Pill';

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

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.bgDark]}>
      <SearchBar />

      {store?.categories && (
        <FlatList
          data={Object.keys(store.categories)}
          horizontal
          keyExtractor={({item}) => item}
          renderItem={({item}) => <Pill name={item} />}
        />
      )}
      {store &&
        Object.entries(store.categories).map(([key, genreMovies]) => (
          <View style={[C.p4]}>
            <Text style={[C.weightBold, C.textWhite, C.font4, C.mb4]}>
              {key}
            </Text>
            <FlatList
              data={genreMovies}
              horizontal
              keyExtractor={({title}) => title}
              renderItem={({item}) => (
                <MovieCard movie={item} onPress={() => openDetails(item)} />
              )}
            />
          </View>
        ))}
    </ScrollView>
  );
};
