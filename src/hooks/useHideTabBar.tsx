import {useEffect, useLayoutEffect} from 'react';
import {useAppNavigation} from './useAppNavigation';
import {getScreenOptions} from '@/routes/constants';
import {useAppTheme} from './useAppTheme';
import {useIsFocused} from '@react-navigation/native';

export function useHideTabBar() {
  const navigaion = useAppNavigation();
  const theme = useAppTheme();

  useLayoutEffect(() => {
    const tabBar = navigaion.getParent('tabBar');

    tabBar?.setOptions(getScreenOptions({theme, showTabBar: false}));

    return () => {
      tabBar?.setOptions(getScreenOptions({theme}));
    };
  }, []);
}
