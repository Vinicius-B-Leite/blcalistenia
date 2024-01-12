import {useEffect, useLayoutEffect, useRef} from 'react';
import {useAppNavigation} from './useAppNavigation';
import {getScreenOptions} from '@/routes/constants';
import {useAppTheme} from './useAppTheme';
import {useIsFocused} from '@react-navigation/native';

export function useHideTabBar() {
  const navigaion = useAppNavigation();
  const theme = useAppTheme();

  const themeRef = useRef(theme);
  themeRef.current = theme;
  useEffect(() => {
    const tabBar = navigaion.getParent('tabBar');

    tabBar?.setOptions(
      getScreenOptions({theme: themeRef.current, showTabBar: false}),
    );

    return () => {
      console.log(themeRef);

      tabBar?.setOptions(getScreenOptions({theme: themeRef.current}));
    };
  }, []);
}
