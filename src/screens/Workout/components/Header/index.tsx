import React, {useEffect, useRef} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import useWorkoutHeader from './useWorkoutHeader';
import {useAppNavigation, useAppTheme} from '@/hooks';
import {BoxPressable, Box, Input, Text} from '@/components';

const Header: React.FC = () => {
  const theme = useAppTheme();
  const navigation = useAppNavigation();

  const {
    handleSelectImage,
    isWorkingout,
    workout,
    onChangeTitleText,
    cancelWorkout,
  } = useWorkoutHeader();

  return (
    <Box flexDirection="row" alignItems="center" mb={24} gap={24}>
      <Box flexDirection="row" flex={1} alignItems="center" gap={14}>
        <BoxPressable onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={theme.spacing[24]}
            color={theme.colors.contrast}
          />
        </BoxPressable>
        <Input
          value={workout.title}
          onChangeText={onChangeTitleText}
          placeholder="Título do treino"
          boxProps={{
            flex: 1,
          }}
        />
      </Box>
      {isWorkingout ? (
        <BoxPressable onPress={cancelWorkout}>
          <Text preset="pSmall">Cancelar</Text>
        </BoxPressable>
      ) : (
        <BoxPressable onPress={handleSelectImage}>
          <Feather
            name="image"
            size={theme.spacing[24]}
            color={theme.colors.contrast}
          />
        </BoxPressable>
      )}
    </Box>
  );
};

export default Header;
