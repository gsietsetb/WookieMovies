import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

export const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const CustomNavigator: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
