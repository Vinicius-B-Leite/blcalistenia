import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  useTheme as useNavTheme,
} from '@react-navigation/native';

import {Historic} from '@/screens';
import {useTheme} from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeStack from './HomeStack';
import {TabParamList} from './Models';

export const TAB_BAR_HEIGHT = Dimensions.get('screen').height * 0.06;
const {Navigator, Screen} = createMaterialTopTabNavigator<TabParamList>();

const Routes: React.FC = () => {
  const theme = useTheme();
  const navTheme = useNavTheme();

  navTheme.colors.background = theme.colors.background;

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.name == 'dark' ? 'light-content' : 'dark-content'}
      />
      <Navigator
        id="tabBar"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarIndicatorStyle: {display: 'none'},
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.darkBackground,
            height: TAB_BAR_HEIGHT,
          },
          tabBarActiveTintColor: theme.colors.contrast,
        }}>
        <Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="home" size={theme.sizes.icons.md} color={color} />
            ),
          }}
        />
        {/* <Screen name='Dashboard' component={Dashboard}
                    options={{
                        tabBarIcon: ({ color }) => <Entypo name='bar-graph' size={theme.sizes.icons.md} color={color} />
                    }}
                /> */}
        <Screen
          name="Historic"
          component={Historic}
          options={{
            tabBarIcon: ({color}) => (
              <Octicons
                name="history"
                size={theme.sizes.icons.md}
                color={color}
              />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
