import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MovieDetails} from './screens/MovieDetails';

export const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MOVIES_LIST = 'Movies List';
export const MOVIE_DETAILS = 'Movie Details';

export const CustomTabBar: React.FC<{}> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MovieStack = createNativeStackNavigator();
const MovieStackScreen = () => (
  <MovieStack.Navigator>
    <MovieStack.Screen
      name={MOVIES_LIST}
      component={Home}
      options={{tabBarLabel: 'Wookie Movies'}}
    />
    <MovieStack.Screen
      name={MOVIE_DETAILS}
      component={MovieDetails}
      options={{tabBarLabel: 'Movie Details!'}}
    />
  </MovieStack.Navigator>
);

export const CustomNavigator: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
          component={MovieStackScreen}
        />
        <Tab.Screen
          name="Search"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="search" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
