import {Text, TouchableOpacity} from 'react-native';
import C from 'consistencss';
import React from 'react';

type CardProps = {
  /**
   * Current Movie
   */
  name: string;
  /**
   * Current Movie
   */
  selected?: boolean;
  /**
   * Current Movie
   */
  number?: number;
  /**
   * onPress callback
   */
  onPress?: () => void;
};

export default ({name, selected = true, onPress, number}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        C.ml4,
        C.mb4,
        C.row,
        C.px3,
        C.py1,
        C.itemsCenter,
        C.justifyCenter,
        selected ? C.bgWhite : C.bgGreyish,
        C.radius2,
        C.flex,
      ]}>
      <Text numberOfLines={2} style={[selected ? C.textBlack : C.textDark]}>
        {name} {number && number > 1 && '(' + number + ')'}
      </Text>
    </TouchableOpacity>
  );
};
