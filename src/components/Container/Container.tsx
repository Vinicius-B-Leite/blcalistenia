import React from 'react';
import {BoxScroll, Box} from '../Box/Box';
import {BoxScrollProps, BoxType} from '../Box/types';

type WrapperProps =
  | ({scrollEnabled?: false} & BoxType)
  | ({scrollEnabled: true} & BoxScrollProps);

type ContainerProps = WrapperProps & {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  scrollEnabled = false,
  ...rest
}) => {
  const Wrapper = scrollEnabled ? BoxScroll : Box;

  return (
    <Wrapper
      backgroundColor="thirdBg"
      p={24}
      flex={1}
      showsVerticalScrollIndicator={false}
      {...rest}>
      {children}
    </Wrapper>
  );
};
