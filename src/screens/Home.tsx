import React from 'react';
import {ScrollView, useColorScheme} from 'react-native';
import C from 'consistencss';

export const Home: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={[C.hFull]}>
      {children}
    </ScrollView>
  );
};
