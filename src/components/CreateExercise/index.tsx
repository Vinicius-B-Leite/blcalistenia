import React from 'react';
import {useTheme} from 'styled-components/native';
import {category} from '../../utils/category';
import {muscles} from '../../utils/muscles';
import * as S from './styles';
import useHookCreateExercise from './useCreateExercise';
import {useCreateExercise} from '../../domains/Exercise/useCases/useCreateExercise';
import {useDispatch} from 'react-redux';
import {addExercise} from '@/features/Exercises/exerciseSlicer';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Filter from '../Filter/Filter';
import Box from '../Box/Box';
import {FlatList} from 'react-native';

const CreateExercise: React.FC = () => {
  const theme = useTheme();
  const {
    selectCategory,
    selectMuscle,
    categoriesSelected,
    musclesSelected,
    onChangeExerciseNameInput,
    exerciseNameInput,
    handleCreateExercise,
  } = useHookCreateExercise();

  return (
    <>
      <Text preset="pLarge" textAlign="center" bold mb={24}>
        Criar exercício
      </Text>

      <Input
        placeholder="Nome do exercício"
        placeholderTextColor={theme.colors.darkText}
        onChangeText={onChangeExerciseNameInput}
        value={exerciseNameInput}
        boxProps={{bg: 'secondBg'}}
      />

      <Box mt={24}>
        <Text preset="pMedium">Categoria</Text>
        <FlatList
          data={category}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={({item: c}) => (
            <Filter
              label={c}
              key={c}
              onPress={() => selectCategory(c)}
              isActive={categoriesSelected.includes(c)}
              mr={14}
              mt={8}
            />
          )}
        />
      </Box>

      <Box marginVertical={24}>
        <Text preset="pMedium">Músculos</Text>

        <FlatList
          data={muscles}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={({item: m}) => (
            <Filter
              key={m}
              onPress={() => selectMuscle(m)}
              isActive={musclesSelected.includes(m)}
              label={m}
              mr={14}
              mt={8}
            />
          )}
        />
      </Box>
      <S.Butotn onPress={handleCreateExercise}>
        <S.ButotnText>Concluir</S.ButotnText>
      </S.Butotn>
    </>
  );
};

export default CreateExercise;
