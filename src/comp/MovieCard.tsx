import {Image, ImageStyle, Text, TouchableOpacity, View} from 'react-native';
import C, {apply} from 'consistencss';
import {BASE_PIXEL, topRadius} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import React from 'react';
import {useObserver} from 'mobx-react';
import {Movie} from '../store/MovieTypes';

type CardProps = {
  /**
   * Current Movie
   */
  movie: Movie;
  /**
   * onPress callback
   */
  onPress?: () => void;
  /**
   * onLongPress callback
   */
  onLongPress?: () => void;
};

export default ({movie, onPress, onLongPress}: CardProps) => {
  return useObserver(() => (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[C.mr4, C.my2, C.bgWhite, C.radius4, C.w30]}>
      <Image
        source={{uri: movie.poster}}
        style={apply(C.h40, topRadius()) as ImageStyle}
      />
      <View style={[C.m4, C.flex, C.justifyBetween]}>
        <Text numberOfLines={2} style={[C.weightBold, C.mb2]}>
          {movie.title}
        </Text>
        <View style={[C.row, C.justifyBetween, C.itemsCenter]}>
          <View style={[C.row]}>
            <Icon name="star-o" size={BASE_PIXEL * 4} />
            <Text style={[C.ml2]}>{movie.imdb_rating}</Text>
          </View>
          <Icon
            name={movie.favorite ? 'heart' : 'heart-o'}
            size={BASE_PIXEL * 4}
            color={!movie.favorite ? palette.dark : palette.salmon}
          />
        </View>
      </View>
    </TouchableOpacity>
  ));
};
