import React, {useEffect} from 'react';
import {Alert, FlatList, ScrollView, Text} from 'react-native';
import {useFetch} from 'usehooks-ts';
import {BASE_URL, fetchConfig} from '../utils/data';
import C from 'consistencss';
import {Movie, MoviesList} from './MovieDetails';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../comp/MovieCard';
import {Routes} from '../routes';
import {useStores} from '../store/MovieProvider';
import {useObserver} from 'mobx-react';
import {isNarrow} from '../styles/ui';
import EmptyScreen from '../comp/EmptyScreen';

export const Favorites: React.FC = () => {
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
      <Text style={[C.textWhite, C.font6, C.alignCenter, C.my4]}>
        🎬 Favorite Movies
      </Text>
      {store && store?.favBadge > 0 ? (
        <FlatList
          data={store?.favorites}
          numColumns={isNarrow ? 3 : 6}
          keyExtractor={({title}) => title}
          renderItem={({item}) => (
            <MovieCard
              movie={item}
              onLongPress={() => store?.toggleFavorite(item.id)}
              onPress={() => openDetails(item)}
            />
          )}
        />
      ) : (
        <EmptyScreen
          search={store.search}
          onClear={() => store?.clearSearch()}
        />
      )}
    </ScrollView>
  ));
};
