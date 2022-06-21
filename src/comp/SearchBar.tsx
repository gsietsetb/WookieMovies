import {Keyboard, Switch, Text, TextInput, View} from 'react-native';
import C from 'consistencss';
import {BASE_PIXEL} from '../styles/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {palette} from '../styles/colors';
import React, {useCallback, useEffect} from 'react';
import {useObserver} from 'mobx-react';
import {useStores} from '../store/MovieProvider';
import _ from 'lodash';
import {searchKeysDefault} from '../store/MovieStore';
import {fetchConfig, SEARCH_URL} from '../utils/data';

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

export default ({keys = searchKeysDefault, number = 0}: SearchProps) => {
  const store = useStores();

  /** Collapses the Keyboard when no results are shown*/
  useEffect(() => {
    if (number < 1) {
      Keyboard.dismiss();
    }
  }, [number]);

  /**Network request to fetch search movies from API*/
  const updateSearchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        SEARCH_URL + store?.search.toLowerCase(),
        fetchConfig,
      );
      const json = await response.json();
      if (json.movies.length > 0) {
        store?.setSearchMovies(json?.movies);
      }
    } catch (error) {
      console.error(error);
    }
  }, [store]);

  useEffect(() => {
    if (store?.networkSearch && store?.search.length > 0) {
      updateSearchMovies();
    }
  }, [store?.networkSearch, store?.search.length, updateSearchMovies]);

  return useObserver(() => (
    <View style={[C.m4, C.row, C.px3, C.itemsCenter, C.bgWhite, C.radius2]}>
      <Icon name="search" size={BASE_PIXEL * 4} color={palette.dark} />

      {store && (
        <TextInput
          value={store?.search}
          onChangeText={newText => store?.setSearch(newText)}
          placeholder={'Search by ' + keys?.join(', ') + '...'}
          style={[C.flex, C.p2]}
        />
      )}

      {/**Perform request to Search API or internal*/}
      <Icon
        name={store?.networkSearch ? 'wifi' : 'database'}
        size={BASE_PIXEL * 4}
        color={palette.dark}
      />
      <Switch
        value={store?.networkSearch}
        style={[C.mx2]}
        onChange={() => store?.toggleNetworkSearch()}
      />

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
