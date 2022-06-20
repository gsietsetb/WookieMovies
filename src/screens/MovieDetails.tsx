import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
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

export interface Movie {
  favorite: boolean;
  backdrop: string; // "https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg"
  cast: Array<string>; //["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  classification: string; //"13+"
  director: string; // "Christopher Nolan"
  genres: Array<string>; // ["Action", "Crime", "Drama"]
  id: string; // "d6822b7b-48bb-4b78-ad5e-9ba04c517ec8"
  imdb_rating: number; //  9
  length: string; //  "2h 32min"
  overview: string; // "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
  poster: string; //  "https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg"
  released_on: Date; //"2008-07-16T00:00:00"
  slug: string; // "the-dark-knight-2008"
  title: string; // "The Dark Knight"
}

export interface MoviesList {
  movies: Array<Movie>;
}

export const MovieDetails: React.FC<{
  title: string;
}> = () => {
  const store = useStores();
  const route = useRoute();
  const {movie}: Movie = route.params || '';
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
            style={apply(C.w20, C.h30, C.radius2)}
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
