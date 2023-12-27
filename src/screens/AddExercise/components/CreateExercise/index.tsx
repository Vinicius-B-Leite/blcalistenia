import React from 'react';
import {category, muscles} from '@/utils';

import useHookCreateExercise from './useCreateExercise';

import {FlatList} from 'react-native';

import {Text, Input, Filter, Box, Button} from '@/components';
import {useAppTheme} from '@/hooks';

type CreateExerciseProps = {
  closeBottomSheet: () => void;
};
const CreateExercise: React.FC<CreateExerciseProps> = ({closeBottomSheet}) => {
  const theme = useAppTheme();
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
        placeholderTextColor={theme.colors.secondText}
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
      <Button
        label="Concluir"
        onPress={() => {
          closeBottomSheet();
          handleCreateExercise();
        }}
        mt={24}
      />
    </>
  );
};

export default CreateExercise;
