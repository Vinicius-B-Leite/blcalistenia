import React from 'react';
import {Dimensions, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import Box, {BoxType} from '../Box/Box';
import {Theme, dark} from '@/theme/dark';
import {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  BorderProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  ResponsiveValue,
  ShadowProps,
  SpacingProps,
  SpacingShorthandProps,
  VisibleProps,
  backgroundColor,
  backgroundColorShorthand,
  border,
  createRestyleComponent,
  layout,
  opacity,
  shadow,
  spacing,
  spacingShorthand,
  visible,
} from '@shopify/restyle';
import {useAppTheme} from '@/hooks/useAppTheme';

const {height} = Dimensions.get('screen');
export type ImageProps = Pick<FastImageProps, 'source' | 'resizeMode'>;

type RSImageProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  VisibleProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  FastImageProps;

export const Image = createRestyleComponent<RSImageProps, Theme>(
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
  FastImage,
);