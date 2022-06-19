import {Image, Text, TouchableOpacity, View} from 'react-native';
import C, {apply} from 'consistencss';
import {BASE_PIXEL, topRadius} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import React from 'react';
import {Movie} from '../screens/MovieDetails';

type CardProps = {
  /**
   * Current Movie
   */
  movie: Movie;
  /**
   * onPress callback
   */
  onPress?: () => void;
};

export default ({movie, onPress}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[C.mr4, C.bgWhite, C.radius4, C.w30]}>
      <Image
        source={{uri: movie.poster}}
        // @ts-ignore
        style={apply(C.h40, topRadius())}
      />
      <View style={[C.m4, C.flex, C.justifyBetween]}>
        <Text numberOfLines={2} style={[C.weightBold, C.mb2]}>
          {movie.title}
        </Text>
        <View style={[C.row, C.justifyBetween, C.itemsCenter]}>
          <View style={[C.row]}>
            <Icon name="star" size={BASE_PIXEL * 4} />
            <Text style={[C.ml2]}>{movie.imdb_rating}</Text>
          </View>
          <Icon name="heart" size={BASE_PIXEL * 4} color={palette.salmon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
