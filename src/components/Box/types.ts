import {Theme} from '@/theme/dark';
import {
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
} from '@shopify/restyle';
import {ScrollViewProps, TouchableOpacityProps} from 'react-native';
import {Box} from './Box';

export type ComunmRestyleProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  VisibleProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme>;

export type BoxPressableProps = ComunmRestyleProps & TouchableOpacityProps;
export type BoxScrollProps = ComunmRestyleProps & ScrollViewProps;
export type BoxType = React.ComponentProps<typeof Box>;
