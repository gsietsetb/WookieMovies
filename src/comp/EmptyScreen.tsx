import {Button, Image, ImageStyle, Text, View} from 'react-native';
import C, {apply} from 'consistencss';
import React from 'react';
import {palette} from '../styles/colors';

const emtpy404 =
  'https://fab404.com/wp-content/uploads/2015/03/starwars404.jpg';

type EmptyProps = {
  /**
   * Current search
   */
  search: string;
  /**
   * onPress callback
   */
  onClear?: () => void;
};

export default ({search = '', onClear}: EmptyProps) => (
  <View style={[C.itemsCenter]}>
    <Text style={[C.textWhite]}>Sorry, no results for {search}</Text>
    <Button color={palette.white} title={'Try again?'} onPress={onClear} />
    <Image
      style={apply(C.h100, C.wFull) as ImageStyle}
      resizeMode={'cover'}
      source={{
        uri: emtpy404,
      }}
    />
  </View>
);
