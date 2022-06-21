import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useFetch} from 'usehooks-ts';
import {
  BASE_URL,
  fetchConfig,
  isFilterSelected,
  sortByLength,
} from '../utils/data';
import C from 'consistencss';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../comp/MovieCard';
import {Routes} from '../routes';
import SearchBar from '../comp/SearchBar';
import {useStores} from '../store/MovieProvider';
import Pill from '../comp/Pill';
import {useObserver} from 'mobx-react';
import EmptyScreen from '../comp/EmptyScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import {BASE_PIXEL, bordColor, isNarrow} from '../styles/ui';
import {BackendMoviesList, CategoryMap, Movie} from '../store/MovieTypes';

export const Home = () => {
  const store = useStores();
  const [showTip, toggleTip] = useState(true);
  const {data: moviesList, error} = useFetch<BackendMoviesList>(
    BASE_URL,
    fetchConfig,
  );
  const isLoading = moviesList === undefined;
  const {navigate} = useNavigation();

  if (error) {
    Alert.alert('Fetching Error', 'Got an Error fetching movies...' + error);
  }

  /**Update stores when fetching data*/
  useEffect(() => {
    if (store && moviesList) {
      store?.setMovies(moviesList.movies);
    }
  }, [store, moviesList]);

  const openDetails = (item: Movie) =>
    // @ts-ignore
    navigate(Routes.MOVIE_DETAILS, {movie: item});

  return useObserver(() => (
    <View style={[C.bgDark, C.flex]}>
      <View style={[C.h40]}>
        {store && <SearchBar number={store?.matchingFilters?.length || 0} />}

        {/** Category filter pills*/}
        {store?.categories && (
          <FlatList
            data={sortByLength(store.categories)}
            horizontal
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <Pill
                name={item}
                number={store?.categories[item].length}
                selected={isFilterSelected(store?.categoryFilter, item)}
                onPress={() => store?.toggleCategoryFilter(item)}
              />
            )}
          />
        )}

        {/** Cast filter pills*/}
        {store?.cast && (
          <FlatList
            data={sortByLength(store.cast)}
            horizontal
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <Pill
                name={item}
                selected={isFilterSelected(store?.castFilter, item)}
                number={store?.cast[item].length}
                onPress={() => store?.toggleCastFilter(item)}
              />
            )}
          />
        )}
      </View>

      <ScrollView>
        {/**Favorite Tips*/}
        {showTip && store?.favBadge === 0 && (
          <View
            style={[
              C.bgBlack,
              bordColor(palette.white),
              C.radius2,
              C.m4,
              C.p2,
              C.row,
              C.selfCenter,
              C.itemsCenter,
            ]}>
            <Text style={[C.textWhite, C.italic, isNarrow && C.flex]}>
              💡 Tip: long press a movie 🎬 to add it to favorites ❤️
            </Text>
            <Icon
              name="close"
              style={[C.p2]}
              onPress={() => toggleTip(false)}
              size={BASE_PIXEL * 4}
              color={palette.white}
            />
          </View>
        )}

        {/**Genres*/}
        {store &&
          (isLoading ? (
            <ActivityIndicator />
          ) : store.noResults ? (
            <EmptyScreen
              search={store.search}
              onClear={() => store?.clearSearch()}
            />
          ) : (
            store?.matchingCategories &&
            // @ts-ignore
            store.matchingCategories.map(([key, genreMovies]: CategoryMap) => (
              <View style={[C.pl4, C.my4]} key={key}>
                <Text style={[C.weightBold, C.textWhite, C.font5, C.mb4]}>
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
          ))}
      </ScrollView>
    </View>
  ));
};
