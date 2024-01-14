import {Box} from '@/components';
import {Theme} from '@/theme';
import React from 'react';
import {View} from 'react-native';

type CircleProps = {
  color: keyof Theme['colors'];
  size: number;
};

const Circle: React.FC<CircleProps> = ({size, color}) => {
  return (
    <Box
      height={size}
      width={size}
      bg={color}
      borderRadius="full"
      marginRight={14}
    />
  );
};

export default Circle;
