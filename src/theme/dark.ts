import {createTheme} from '@shopify/restyle';
import {pallet} from './pallete';
import {Dimensions} from 'react-native';
import {hexToRgb} from '@/utils/hexToRgb';

export const dark = createTheme({
  colors: {
    primaryBg: pallet.black,
    thirdBg: pallet.thirdBalck,

    contrast: pallet.orange,
    secondContrast: hexToRgb(pallet.orange, 0.3),
    thirdContrast: hexToRgb(pallet.orange, 0.7),
    darkContrast: pallet.darkOrange,

    alert: pallet.red,

    text: pallet.white,
    secondText: pallet.gray,

    success: pallet.green,

    blackOpacity: pallet.blackOpacty30,
  },
  spacing: {
    4: 4,
    8: 8,
    14: 14,
    24: 24,
    34: 34,
    44: 44,
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
