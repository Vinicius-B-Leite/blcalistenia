import {Theme} from '@/theme/dark';
import {
  createBox,
  createRestyleComponent,
  spacing,
  backgroundColor,
  opacity,
  layout,
  border,
  shadow,
  visible,
  spacingShorthand,
  backgroundColorShorthand,
} from '@shopify/restyle';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {BoxPressableProps, BoxScrollProps} from './types';

const Box = createBox<Theme>();
export default Box;

export const BoxPressable = createRestyleComponent<BoxPressableProps, Theme>(
  [
    spacing,
    backgroundColor,
    opacity,
    layout,
    border,
    shadow,
    visible,
    spacingShorthand,
    backgroundColorShorthand,
  ],
  TouchableOpacity,
);
export const BoxScroll = createRestyleComponent<BoxScrollProps, Theme>(
  [
    spacing,
    backgroundColor,
    opacity,
    layout,
    border,
    shadow,
    visible,
    spacingShorthand,
    backgroundColorShorthand,
  ],
  ScrollView,
);
