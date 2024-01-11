import React, {useMemo} from 'react';
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
import {Box, Icon} from '@/components';
import {getScreenOptions} from './constants';

const {Navigator, Screen} = createMaterialTopTabNavigator<TabParamList>();

const Routes: React.FC = () => {
  const theme = useAppTheme();
  const navTheme = useNavTheme();

  navTheme.colors.background = theme.colors.thirdBg;

  const screenOptions = useMemo(() => getScreenOptions({theme}), [theme]);

  return (
    <Box flex={1} bg="thirdBg">
      <NavigationContainer>
        <Navigator
          id="tabBar"
          tabBarPosition="bottom"
          screenOptions={screenOptions}>
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
