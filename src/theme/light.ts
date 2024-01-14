import {hexToRgb} from '@/utils/hexToRgb';
import {Theme, dark} from './dark';
import {pallet} from './pallete';

export const light: Theme = {
  ...dark,
  colors: {
    primaryBg: pallet.secondsWhite,

    thirdBg: pallet.secondGray,

    contrast: pallet.blue,
    secondContrast: hexToRgb(pallet.blue, 0.3),
    thirdContrast: hexToRgb(pallet.blue, 0.7),
    darkContrast: pallet.darkBlue,

    alert: pallet.red,

    text: pallet.black,
    secondText: pallet.fourthBalck,

    success: pallet.green,

    blackOpacity: pallet.blackOpacty30,
  },
};
