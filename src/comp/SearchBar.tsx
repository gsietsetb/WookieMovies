import {TextInput, View} from 'react-native';
import C from 'consistencss';
import {BASE_PIXEL} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import React from 'react';
import {useObserver} from 'mobx-react';
import {useStores} from '../store/MovieProvider';

type SearchProps = {
  /**
   * search text
   */
  text?: string;
  /**
   * search keys /
   */
  keys?: [];
  /**
   * onPress callback
   */
  onSet?: () => void;
};

export default ({keys = ['title', 'cast'], onSet}: SearchProps) => {
  const store = useStores();

  return useObserver(() => (
    <View
      style={[C.m4, C.row, C.px3, C.itemsCenter, C.bgWhite, C.radius2, C.flex]}>
      <Icon name="search" size={BASE_PIXEL * 4} color={palette.greyish} />

      <TextInput
        onTextInput={onSet}
        onChangeText={text => store.setSearch(text)}
        placeholder={'Search by title, cast...'}
        style={[C.flex, C.p2]}
      />

      <Icon
        onPress={() => store.clearSearch()}
        name="close"
        size={BASE_PIXEL * 4}
        color={palette.greyish}
      />
    </View>
  ));
};
