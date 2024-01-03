import {BoxPressable, Text, Box, Icon} from '@/components';

import {useAppTheme} from '@/hooks';
import React from 'react';
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
        <Icon family="Feather" name={iconName} size={24} color={'contrast'} />
      </Box>
      <Text preset="pMedium">{label}</Text>
    </BoxPressable>
  );
};

export default Options;
