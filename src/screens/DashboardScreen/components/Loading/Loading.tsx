import {Box, BoxType, Spiner, SpinerProps} from '@/components';
import React from 'react';
import {View} from 'react-native';

type LoadingProps = Pick<BoxType, 'width' | 'height'> & SpinerProps;

const Loading: React.FC<LoadingProps> = ({width, height, ...rest}) => {
  return (
    <Box width={width} height={height}>
      <Spiner {...rest} />
    </Box>
  );
};

export default Loading;
