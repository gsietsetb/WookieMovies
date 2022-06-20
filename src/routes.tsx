import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MovieDetails} from './screens/MovieDetails';
import {StyleSheet, View} from 'react-native';
import C from 'consistencss';
import {palette} from './styles/colors';
import {Favorites} from './screens/Favorites';
import {useStores} from './store/MovieProvider';
import {useObserver} from 'mobx-react';

export const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export enum Routes {
  HOME_STACK = 'Home Stack',
  MOVIE_DETAILS = 'Movie Details',
  MOVIES_LIST = 'Movies List',
  MOVIE_FAVORITES = 'Favorite Movies',
}

const MovieStack = createNativeStackNavigator();
const MovieStackScreen = () => (
  <MovieStack.Navigator>
    <MovieStack.Screen
      options={{headerShown: false}}
      name={Routes.MOVIES_LIST}
      component={Home}
    />
    <MovieStack.Screen
      options={{
        headerTintColor: palette.white,
        headerBackground: () => (
          <View style={[StyleSheet.absoluteFill, C.bgDark]} />
        ),
      }}
      name={Routes.MOVIE_DETAILS}
      component={MovieDetails}
    />
  </MovieStack.Navigator>
);

export const CustomNavigator: React.FC<{}> = () => {
  const store = useStores();
  return useObserver(() => (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: [C.absolute, C.bgDark],
          tabBarActiveTintColor: palette.white,
          tabBarInactiveTintColor: palette.greyish,
        }}>
        <Tab.Screen
          name={Routes.HOME_STACK}
          options={{
            headerBackground: () => (
              <View style={[StyleSheet.absoluteFill, C.bgDark]} />
            ),
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
          component={MovieStackScreen}
        />
        <Tab.Screen
          name={Routes.MOVIE_FAVORITES}
          component={Favorites}
          options={{
            headerShown: false,
            tabBarBadge:
              store && store?.favBadge > 0 ? store?.favBadge : undefined,
            tabBarIcon: ({color, size}) => (
              <Icon name="heart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ));
};
