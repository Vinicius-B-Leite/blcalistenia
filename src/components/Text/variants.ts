import {TextStyle} from 'react-native';
import {RestyleTextProps} from './Text';

export const variants = {
  primaryTitle: 'primaryTitle',
  secondaryTitle: 'secondaryTitle',

  pLarge: 'pLarge',
  pMedium: 'pMedium',
  pSmall: 'pSmall',
};

export const textsVariantsStyles: Record<
  keyof typeof variants,
  RestyleTextProps
> = {
  primaryTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 30,
    color: 'text',
  },
  secondaryTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 30,
    color: 'text',
  },
  pLarge: {
    fontSize: 20,
    lineHeight: 26,
    color: 'text',
  },
  pMedium: {
    fontSize: 16,
    lineHeight: 20,
    color: 'text',
  },
  pSmall: {
    fontSize: 14,
    lineHeight: 20,
    color: 'text',
  },
};
