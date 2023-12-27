import {Theme} from '@/theme';

import {IconProps} from 'react-native-vector-icons/Icon';
import {useAppTheme} from '@/hooks';
import {iconFamily, iconSizes} from './constants';

type ComumnIconProps = Omit<IconProps, 'size'> & {
  color: keyof Theme['colors'];
  size: keyof typeof iconSizes;
  family: keyof typeof iconFamily;
};

export const Icon = ({color, name, size, family, ...rest}: ComumnIconProps) => {
  const Component = iconFamily[family];
  const theme = useAppTheme();
  return (
    <Component
      color={theme.colors[color]}
      name={name}
      style={{fontSize: size}}
      {...rest}
    />
  );
};
