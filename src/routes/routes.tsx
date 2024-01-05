import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  useTheme as useNavTheme,
} from '@react-navigation/native';

import {HistoricScreen, DashboardScreen} from '@/screens';

import HomeStack from './HomeStack';
import {TabParamList} from './Models';
import {useAppTheme} from '@/hooks';
import {Box, Container, Icon} from '@/components';

const {Navigator, Screen} = createMaterialTopTabNavigator<TabParamList>();

const Routes: React.FC = () => {
  const theme = useAppTheme();
  const navTheme = useNavTheme();

  navTheme.colors.background = theme.colors.thirdBg;

  return (
    <Box flex={1} bg="thirdBg">
      <NavigationContainer>
        <Navigator
          id="tabBar"
          tabBarPosition="bottom"
          screenOptions={{
            tabBarIndicatorStyle: {display: 'none'},
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: theme.colors.primaryBg,
              paddingVertical: theme.spacing[4],
            },
            tabBarActiveTintColor: theme.colors.contrast,
            swipeEnabled: false,
          }}>
          <Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  family="Entypo"
                  name="home"
                  size={24}
                  color={focused ? 'contrast' : 'darkContrast'}
                />
              ),
            }}
          />
          <Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  family="Entypo"
                  name="bar-graph"
                  size={24}
                  color={focused ? 'contrast' : 'darkContrast'}
                />
              ),
            }}
          />

          <Screen
            name="Historic"
            component={HistoricScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  family="Octicons"
                  name="history"
                  size={24}
                  color={focused ? 'contrast' : 'darkContrast'}
                />
              ),
            }}
          />
        </Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
