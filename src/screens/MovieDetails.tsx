import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageStyle,
  ScrollView,
  Text,
  View,
} from 'react-native';
import C, {apply} from 'consistencss';
import {useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {palette} from '../styles/colors';
import {BASE_PIXEL, isNarrow} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useObserver} from 'mobx-react';
import {useStores} from '../store/MovieProvider';

export const MovieDetails = () => {
  const store = useStores();
  const route = useRoute();
  // @ts-ignore
  const {movie} = route.params;
  return useObserver(() =>
    movie ? (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.bgDark]}>
        <ImageBackground
          source={{uri: movie.backdrop}}
          style={[C.wFull, isNarrow ? C.h50 : C.h80]}
        />
        <View style={[C.row, C.m4, C.mt_15]}>
          <Image
            source={{uri: movie.poster}}
            style={apply(C.w20, C.h30, C.radius2) as ImageStyle}
          />
          <View style={[C.flex, C.itemsStart]}>
            <Text style={[C.weightBold, C.textWhite, C.font6, C.p4, C.wFull]}>
              {movie.title} ({movie.imdb_rating})
            </Text>
            <View style={[C.row, C.flex, C.justifyBetween, C.itemsCenter]}>
              <Rating
                ratingColor={palette.white}
                tintColor={palette.dark}
                ratingCount={5}
                startingValue={movie.imdb_rating / 2}
                imageSize={30}
              />
              <View style={[C.flex]} />
              <Icon
                onPress={() => store?.toggleFavorite(movie.id)}
                name={movie.favorite ? 'heart' : 'heart-o'}
                size={BASE_PIXEL * 6}
                color={!movie.favorite ? palette.white : palette.salmon}
              />
            </View>
          </View>
        </View>

        <View style={[C.p4]}>
          <Text style={[C.weightBold, C.textWhite, C.mb4, C.font4]}>
            {new Date(movie.released_on).getFullYear()} | {movie.length} |{' '}
            {movie.director}
          </Text>
          {movie.cast && (
            <Text style={[C.weightBold, C.textWhite, C.mb4]}>
              Cast: {movie.cast.join(', ')}
            </Text>
          )}
          <Text style={[C.textWhite]}>{movie.overview}</Text>
        </View>
      </ScrollView>
    ) : (
      <ActivityIndicator />
    ),
  );
};
