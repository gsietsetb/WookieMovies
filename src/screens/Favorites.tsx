import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import C from 'consistencss';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../comp/MovieCard';
import {Routes} from '../routes';
import {useStores} from '../store/MovieProvider';
import {useObserver} from 'mobx-react';
import {isNarrow} from '../styles/ui';
import EmptyScreen from '../comp/EmptyScreen';
import {Movie} from '../store/MovieTypes';

export const Favorites: React.FC = () => {
  const store = useStores();
  const {navigate} = useNavigation();

  const openDetails = (item: Movie) =>
    // @ts-ignore
    navigate(Routes.MOVIE_DETAILS, {movie: item});

  return useObserver(() => (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={C.itemsCenter}
      style={[C.bgDark]}>
      <Text style={[C.textWhite, C.font6, C.alignCenter, C.my4]}>
        🎬 Favorite Movies
      </Text>
      {store && store?.favBadge > 0 ? (
        <FlatList
          data={store?.favorites}
          numColumns={isNarrow ? 2 : 6}
          keyExtractor={({title}) => title}
          renderItem={({item}) => (
            <MovieCard
              movie={item}
              onLongPress={() => store?.toggleFavorite(item.id)}
              onPress={() => openDetails(item)}
            />
          )}
        />
      ) : (
        <EmptyScreen
          search={store?.search || ''}
          onClear={() => store?.clearSearch()}
        />
      )}
    </ScrollView>
  ));
};
