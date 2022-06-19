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

export interface Movie {
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
  const route = useRoute();
  const {movie}: Movie = route.params || '';
  return movie ? (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.bgDark]}>
      <ImageBackground
        source={{uri: movie.backdrop}}
        style={[C.wFull, C.h50]}
      />
      <View style={[C.row, C.m4, C.mt_15]}>
        <Image source={{uri: movie.poster}} style={apply(C.w20, C.h30)} />
        <View style={[C.flex]}>
          <Text style={[C.weightBold, C.textWhite, C.font6, C.p4]}>
            {movie.title} ({movie.imdb_rating})
          </Text>
          <Text style={[C.weightBold, C.textWhite, C.font6, C.px4]}>
            ⭐⭐⭐⭐✩
          </Text>
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
        {/*<Text>⭐️ {JSON.stringify(movie)}</Text>*/}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator />
  );
};
