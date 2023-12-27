import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  useTheme as useNavTheme,
} from '@react-navigation/native';

import {Historic} from '@/screens';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeStack from './HomeStack';
import {TabParamList} from './Models';
import {useAppTheme} from '@/hooks';

export const TAB_BAR_HEIGHT = Dimensions.get('screen').height * 0.06;
const {Navigator, Screen} = createMaterialTopTabNavigator<TabParamList>();

const Routes: React.FC = () => {
  const theme = useAppTheme();
  const navTheme = useNavTheme();

  navTheme.colors.background = theme.colors.secondBg;

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.secondBg}
        barStyle={'light-content'}
      />
      <Navigator
        id="tabBar"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarIndicatorStyle: {display: 'none'},
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.primaryBg,
            height: TAB_BAR_HEIGHT,
          },
          tabBarActiveTintColor: theme.colors.contrast,
          swipeEnabled: false,
        }}>
        <Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="home" size={theme.spacing[24]} color={color} />
            ),
          }}
        />

        <Screen
          name="Historic"
          component={Historic}
          options={{
            tabBarIcon: ({color}) => (
              <Octicons name="history" size={theme.spacing[24]} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
