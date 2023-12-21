import {Theme} from '@/theme/dark';
import {
  createBox,
  createRestyleComponent,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  VisibleProps,
  SpacingShorthandProps,
  BackgroundColorShorthandProps,
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
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

const Box = createBox<Theme>();
export default Box;
export type BoxType = React.ComponentProps<typeof Box>;

export type BoxPressableProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  VisibleProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  TouchableOpacityProps;

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
