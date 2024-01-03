import React from 'react';

import {BoxPressable} from '../Box/Box';
import {Text} from '../Text/Text';
import {Spiner} from '../Spiner/Spiner';
import {BoxPressableProps} from '../Box/types';
import {variants as textVariants} from '../Text/variants';

export type ButtonProps = BoxPressableProps & {
  label: string;
  isLoading?: boolean;
  textPreset?: keyof typeof textVariants;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  isLoading,
  disabled,
  textPreset = 'pLarge',
  ...boxPressableProps
}) => {
  return (
    <BoxPressable
      height={50}
      borderRadius={10}
      bg={disabled ? 'darkContrast' : 'contrast'}
      disabled={disabled || isLoading}
      alignItems="center"
      justifyContent="center"
      {...boxPressableProps}>
      {isLoading ? (
        <Spiner />
      ) : (
        <Text bold preset={textPreset}>
          {label}
        </Text>
      )}
    </BoxPressable>
  );
};
