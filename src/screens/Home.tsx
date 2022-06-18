import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFetch} from 'usehooks-ts';
import {BASE_URL, fetchConfig} from '../utils/data';
import C from 'consistencss';
import _ from 'lodash';
import {MOVIE_DETAILS} from '../routes';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Home: React.FC<{
  title: string;
}> = ({navigation}) => {
  const {data, error} = useFetch<Post[]>(BASE_URL, {...fetchConfig});

  console.log('rehoe', data);
  const genres = data ? _.groupBy(data?.movies, 'genres') : ['', ''];
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {Object.entries(genres).map(([key, value]) => (
        <View style={[C.p4]}>
          <Text style={[C.weightBold]}>{key}</Text>
          <FlatList
            data={value}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(MOVIE_DETAILS, {movie: item});
                }}
                style={[C.m4, C.bgWhite, C.radius2, C.flex, C.w30]}>
                <Image source={{uri: item.backdrop}} style={[C.h40, C.w30]} />
                <View style={[C.p4]}>
                  <Text style={[C.weightBold]}>{item.title}</Text>
                  <Text>⭐️ {item.imdb_rating}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
};
