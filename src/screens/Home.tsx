import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import {BASE_PIXEL, bordColor} from '../styles/ui';
import _ from 'lodash';

export const Home: React.FC = () => {
  const store = useStores();
  const [showTip, toggleTip] = useState(true);
  const {data: moviesList, error} = useFetch<MoviesList>(BASE_URL, fetchConfig);
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
      {store && <SearchBar number={store?.matchingSearch?.length || 0} />}

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
              selected={
                _.isEmpty(store.categoryFilter)
                  ? true
                  : _.includes(store?.categoryFilter, item)
              }
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
              selected={
                _.isEmpty(store?.castFilter)
                  ? true
                  : _.includes(store?.castFilter, item)
              }
              number={store?.cast[item].length}
              onPress={() => store?.toggleCastFilter(item)}
            />
          )}
        />
      )}

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
          <Text style={[C.textWhite]}>
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
        (store.noResults ? (
          <EmptyScreen
            search={store.search}
            onClear={() => store?.clearSearch()}
          />
        ) : (
          store?.matchingCategories &&
          store.matchingCategories.map(([key, genreMovies]) => (
            <View style={[C.pl4, C.my4]} key={key}>
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
        ))}
    </ScrollView>
  ));
};
