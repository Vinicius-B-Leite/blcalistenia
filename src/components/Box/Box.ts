import {Theme} from '@/theme';
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
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BoxPressableProps, BoxScrollProps} from './types';

export const Box = createBox<Theme>();

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
