import React from 'react';
import {Box} from '../Box/Box';
import {Text} from '../Text/Text';
import {Icon} from '../Icon/Icon';
import {Theme} from '@/theme';

type ToastProps = {
  message: string;
  bg: keyof Theme['colors'];
};

const Toast = ({message, bg}: ToastProps) => {
  return (
    <Box
      backgroundColor={bg}
      flexDirection="row"
      alignItems="center"
      paddingVertical={14}
      paddingHorizontal={14}
      gap={14}
      borderRadius={10}>
      <Icon family="AntDesign" name="infocirlceo" color="text" size={18} />
      <Text preset="pMedium" bold>
        {message}
      </Text>
    </Box>
  );
};

export default Toast;
