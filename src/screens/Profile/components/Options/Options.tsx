import {BoxPressable, Text, Box} from '@/components';

import {useAppTheme} from '@/hooks';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {wrapper} from './styles';

type Options = {
  iconName: 'user' | 'sun';
  label: string;
  onPress: () => void;
};

const Options: React.FC<Options> = ({iconName, label, onPress}) => {
  const theme = useAppTheme();
  return (
    <BoxPressable {...wrapper} onPress={onPress}>
      <Box bg="darkContrast" borderRadius={'full'} p={8}>
        <Feather
          name={iconName}
          size={theme.spacing[24]}
          color={theme.colors.contrast}
        />
      </Box>
      <Text preset="pMedium">{label}</Text>
    </BoxPressable>
  );
};

export default Options;
