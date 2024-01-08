import {Theme} from '@/theme';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';

type getScreenOptionsProps = {
  theme: Theme;
  showTabBar?: boolean;
};

export const getScreenOptions = ({
  theme,
  showTabBar = true,
}: getScreenOptionsProps): MaterialTopTabNavigationOptions => ({
  tabBarIndicatorStyle: {display: 'none'},
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: theme.colors.primaryBg,
    paddingVertical: theme.spacing[4],
    height: showTabBar ? undefined : 0,
  },
  tabBarActiveTintColor: theme.colors.contrast,
  swipeEnabled: false,
});
