import React, {useEffect, useRef} from 'react';
import {Alert} from 'react-native';
import * as S from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../../../routes/Models';
import useWorkoutHeader from './useWorkoutHeader';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import Box, {BoxPressable} from '@/components/Box/Box';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';

const Header: React.FC = () => {
  const theme = useTheme();
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
            size={theme.sizes.icons.md}
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
            size={theme.sizes.icons.sm}
            color={theme.colors.contrast}
          />
        </BoxPressable>
      )}
    </Box>
  );
};

export default Header;
