import {Keyboard, Text, TextInput, View} from 'react-native';
import C from 'consistencss';
import {BASE_PIXEL} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import React, {useEffect} from 'react';
import {useObserver} from 'mobx-react';
import {useStores} from '../store/MovieProvider';
import _ from 'lodash';

type SearchProps = {
  /**
   * search text
   */
  text?: string;
  /**
   * number of results
   */
  number?: number;
  /**
   * search keys /
   */
  keys?: Array<string>;
  /**
   * onPress callback
   */
  onSet?: () => void;
};

export default ({keys = ['title', 'cast'], number = 0}: SearchProps) => {
  const store = useStores();

  /** Collapses the Keyboard when no results are shown*/
  useEffect(() => {
    if (number < 1) {
      Keyboard.dismiss();
    }
  }, [number]);

  return useObserver(() => (
    <View
      style={[C.m4, C.row, C.px3, C.itemsCenter, C.bgWhite, C.radius2, C.flex]}>
      <Icon name="search" size={BASE_PIXEL * 4} color={palette.greyish} />

      {store && (
        <TextInput
          value={store?.search}
          onChangeText={newText => store?.setSearch(newText)}
          placeholder={'Search by ' + keys?.join(', ') + '...'}
          style={[C.flex, C.p2]}
        />
      )}
      {!!number && <Text style={[C.textDark]}>({number})</Text>}

      {store && !_.isEmpty(store.search) && (
        <Icon
          onPress={() => store.clearSearch()}
          name="close"
          style={C.p2}
          size={BASE_PIXEL * 4}
          color={palette.salmon}
        />
      )}
    </View>
  ));
};
