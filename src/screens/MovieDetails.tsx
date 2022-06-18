import React from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native';
import C from 'consistencss';

export const MovieDetails: React.FC<{
  title: string;
}> = ({route}) => {
  const {movie} = route.params;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.bgWhite]}>
      <ImageBackground
        source={{uri: movie.backdrop}}
        style={[C.wFull, C.h50]}
      />
      <View style={[C.row, C.m4, C.mt_15]}>
        <Image source={{uri: movie.poster}} style={[C.w20, C.h30]} />
        <View style={[C.flex]}>
          <Text style={[C.weightBold, C.textWhite, C.font6, C.p4]}>
            {movie.title} ({movie.imdb_rating})
          </Text>
          <Text style={[C.weightBold, C.font6, C.px4]}>⭐⭐⭐⭐✩</Text>
        </View>
      </View>

      <View style={[C.p4]}>
        <Text style={[C.weightBold, C.mb4, C.font4]}>
          {new Date(movie.released_on).getFullYear()} | {movie.length} |{' '}
          {movie.director}
        </Text>
        <Text style={[C.weightBold, C.mb4]}>Cast: {movie.cast.join(', ')}</Text>
        <Text>{movie.overview}</Text>
        {/*<Text>⭐️ {JSON.stringify(movie)}</Text>*/}
      </View>
    </ScrollView>
  );
};
