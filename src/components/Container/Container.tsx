import React from 'react';
import {View} from 'react-native';
import Box, {BoxType} from '../Box/Box';

type ContainerProps = BoxType & {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({children, ...rest}) => {
  return (
    <Box backgroundColor="thirdBg" p={24} flex={1} {...rest}>
      {children}
    </Box>
  );
};

export default Container;
