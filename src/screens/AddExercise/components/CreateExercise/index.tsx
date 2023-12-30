import React from 'react';
import {category, muscles} from '@/constants';

import useHookCreateExercise from './useCreateExercise';

import {FlatList} from 'react-native';

import {Text, Input, Filter, Box, Button, FormInput} from '@/components';
import {useAppTheme} from '@/hooks';
import {Controller, useForm} from 'react-hook-form';
import {CreateExerciseSchema, createExericseSchema} from './schema';
import {zodResolver} from '@hookform/resolvers/zod';

type CreateExerciseProps = {
  closeBottomSheet: () => void;
};
const CreateExercise: React.FC<CreateExerciseProps> = ({closeBottomSheet}) => {
  const theme = useAppTheme();
  const {control, handleSubmit, reset, formState} =
    useForm<CreateExerciseSchema>({
      defaultValues: {
        categories: [],
        muscles: [],
        exerciseName: '',
      },
      resetOptions: {keepDefaultValues: true},

      resolver: zodResolver(createExericseSchema),
    });
  const {selectItem, handleCreateExercise} = useHookCreateExercise(
    control,
    formState.errors,
  );
  console.log(formState.errors);

  return (
    <>
      <Text preset="pLarge" textAlign="center" bold mb={24}>
        Criar exercício
      </Text>

      <FormInput
        control={control}
        name="exerciseName"
        placeholder="Nome do exercício"
        placeholderTextColor={theme.colors.secondText}
        boxProps={{bg: 'secondBg'}}
      />

      <Box mt={24}>
        <Text preset="pMedium">Categoria</Text>
        <FlatList
          data={category}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={({item: c}) => (
            <Controller
              control={control}
              name={'categories'}
              render={({field}) => (
                <Filter
                  label={c}
                  key={c}
                  onPress={() =>
                    selectItem({
                      item: c,
                      onChange: field.onChange,
                      field: 'categories',
                    })
                  }
                  isActive={field.value.includes(c)}
                  mr={14}
                  mt={8}
                />
              )}
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
            <Controller
              control={control}
              name={'muscles'}
              render={({field}) => (
                <Filter
                  key={m}
                  onPress={() =>
                    selectItem({
                      field: 'muscles',
                      item: m,
                      onChange: field.onChange,
                    })
                  }
                  isActive={field.value.includes(m)}
                  label={m}
                  mr={14}
                  mt={8}
                />
              )}
            />
          )}
        />
      </Box>
      <Button
        label="Concluir"
        onPress={handleSubmit(formData => {
          closeBottomSheet();
          handleCreateExercise(formData);
          reset();
        })}
        mt={24}
      />
    </>
  );
};

export default CreateExercise;
