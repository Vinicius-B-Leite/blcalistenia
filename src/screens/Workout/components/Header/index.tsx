import React, {useEffect, useRef} from 'react';

import useWorkoutHeader from './useWorkoutHeader';
import {useAppNavigation, useAppTheme} from '@/hooks';
import {BoxPressable, Box, Input, Text, Icon} from '@/components';

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
          <Icon
            family="AntDesign"
            name="arrowleft"
            size={24}
            color={'contrast'}
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
          <Icon family="Feather" name="image" size={18} color={'contrast'} />
        </BoxPressable>
      )}
    </Box>
  );
};

export default Header;
