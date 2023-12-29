import React from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import {Box, BoxPressable} from '../Box/Box';
import {BoxType} from '../Box/types';

type ModalBaseProps = ModalProps & {
  children: React.ReactNode;
  boxProps?: BoxType;
  position: 'top' | 'center' | 'bottom';
};

export const ModalBase: React.FC<ModalBaseProps> = ({
  onRequestClose,
  children,
  boxProps,
  position,
  ...modalProps
}) => {
  const positionMap: Record<
    typeof position,
    React.ComponentProps<typeof Box>['justifyContent']
  > = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  };
  console.log(modalProps);

  return (
    <Modal {...modalProps}>
      <Box
        flex={1}
        bg="secondBg"
        justifyContent={positionMap[position]}
        alignItems="center">
        <BoxPressable
          style={StyleSheet.absoluteFillObject}
          top={0}
          left={0}
          width={'100%'}
          height={'100%'}
          onPress={onRequestClose}
        />
        <Box bg={'thirdBg'} borderRadius={10} {...boxProps}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};
