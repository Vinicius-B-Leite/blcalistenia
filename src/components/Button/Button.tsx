import React from 'react';

import {BoxPressable, BoxPressableProps, BoxType} from '../Box/Box';
import Text from '../Text/Text';
import Spiner from '../Spiner/Spiner';

type ButtonProps = BoxPressableProps & {
  label: string;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  isLoading,
  disabled,
  ...boxPressableProps
}) => {
  return (
    <BoxPressable
      height={55}
      borderRadius={10}
      bg={disabled ? 'darkContrast' : 'contrast'}
      disabled={disabled || isLoading}
      alignItems="center"
      justifyContent="center"
      {...boxPressableProps}>
      {isLoading ? (
        <Spiner />
      ) : (
        <Text bold preset="pLarge">
          {label}
        </Text>
      )}
    </BoxPressable>
  );
};

export default Button;
