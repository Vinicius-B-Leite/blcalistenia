import React from 'react';
import {useTheme} from 'styled-components/native';
import {category} from '../../utils/category';
import {muscles} from '../../utils/muscles';
import * as S from './styles';
import useHookCreateExercise from './useCreateExercise';
import {useCreateExercise} from '../../domains/Exercise/useCases/useCreateExercise';
import {useDispatch} from 'react-redux';
import {addExercise} from '@/features/Exercises/exerciseSlicer';

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
      <S.Title>Criar exercício</S.Title>

      <S.Input
        placeholder="Nome do exercício"
        placeholderTextColor={theme.colors.darkText}
        onChangeText={onChangeExerciseNameInput}
        value={exerciseNameInput}
      />
      <S.ListTitle>Categoria</S.ListTitle>
      <S.List>
        {category.map(c => (
          <S.ItemContainer
            key={c}
            onPress={() => selectCategory(c)}
            selected={categoriesSelected.includes(c)}>
            <S.ItemName>{c}</S.ItemName>
          </S.ItemContainer>
        ))}
      </S.List>
      <S.ListTitle>Músculos</S.ListTitle>
      <S.List>
        {muscles.map(m => (
          <S.ItemContainer
            key={m}
            onPress={() => selectMuscle(m)}
            selected={musclesSelected.includes(m)}>
            <S.ItemName>{m}</S.ItemName>
          </S.ItemContainer>
        ))}
      </S.List>

      <S.Butotn onPress={handleCreateExercise}>
        <S.ButotnText>Concluir</S.ButotnText>
      </S.Butotn>
    </>
  );
};

export default CreateExercise;
