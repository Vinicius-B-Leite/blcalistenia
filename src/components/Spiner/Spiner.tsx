import {useAppTheme} from '@/hooks';
import {Theme} from '@/theme';
import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

type SpinerPros = ActivityIndicatorProps & {
  color?: keyof Theme['colors'];
};

export const Spiner: React.FC<SpinerPros> = ({
  color = 'text',
  size = 'small',
  ...rest
}) => {
  const theme = useAppTheme();

  return (
    <ActivityIndicator color={theme.colors[color]} size={size} {...rest} />
  );
};


