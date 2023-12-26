import {createTheme} from '@shopify/restyle';
import {pallet} from './pallete';
import {Dimensions} from 'react-native';

export const dark = createTheme({
  colors: {
    primaryBg: pallet.black,
    secondBg: pallet.thirdBalck,
    thirdBg: pallet.secondBlack,

    contrast: pallet.orange,
    darkContrast: pallet.darkOrange,

    alert: pallet.red,

    text: pallet.white,
    secondText: pallet.gray,
  },
  spacing: {
    4: 4,
    8: 8,
    14: 14,
    24: 24,
    34: 34,
  },
  borderRadii: {
    0: 0,
    4: 4,
    10: 10,
    full: Dimensions.get('screen').height,
  },
  textVariants: {
    defaults: {},
  },
});

export type Theme = typeof dark;
