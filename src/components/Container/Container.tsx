import React from 'react';
import {View} from 'react-native';
import Box, {BoxScroll} from '../Box/Box';
import {BoxType} from '../Box/types';

type ContainerProps = BoxType & {
  children: React.ReactNode;
  scrollEnabled?: boolean;
};

const Container: React.FC<ContainerProps> = ({
  children,
  scrollEnabled = false,
  ...rest
}) => {
  const Wrapper = scrollEnabled ? BoxScroll : Box;

  return (
    <Wrapper backgroundColor="thirdBg" p={24} flex={1} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Container;
