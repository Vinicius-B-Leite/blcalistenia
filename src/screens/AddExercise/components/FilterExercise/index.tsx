import React, {memo, useState} from 'react';
import {Modal, ModalProps, FlatList} from 'react-native';
import {FilterType} from '../../index';
import {category, muscles, initialsExercises} from '@/constants';

import {useDispatch} from 'react-redux';
import {setExercises} from '@/features';

import {useGetExercises} from '@/domains';

import {Button, Box, Text, Filter, BoxPressable} from '@/components';
import {Control, Controller} from 'react-hook-form';
import {FilterExerciseSchema} from '../../schema';

type FilterExerciseProps = {
  modalProps: ModalProps;
  closeModal: () => void;
  control: Control<FilterExerciseSchema>;
};
const FilterExercise: React.FC<FilterExerciseProps> = ({
  modalProps,
  closeModal,
  control,
}) => {
  const dispatch = useDispatch();
  const {exercises} = useGetExercises();

  const filterExercises = (data: FilterExerciseSchema) => {
    const exerciesesRealm = [...exercises, ...initialsExercises];

    const exericesesFiltered = exerciesesRealm.filter(v => {
      let copy = v;
      const categoryFiltered = copy.categories.includes(
        data.category.toLowerCase(),
      );
      const exercisesFiltered = copy.muscles.includes(
        data.muscle.toLowerCase(),
      );

      if (data.category && data.muscle) {
        return categoryFiltered && exercisesFiltered;
      }
      if (data.category) {
        return categoryFiltered;
      }
      if (data.muscle) {
        return exercisesFiltered;
      }

      return true;
    });

    dispatch(setExercises([...exericesesFiltered]));
    closeModal();
  };

  return (
    <Modal {...modalProps}>
      <Box flex={1} bg="thirdBg" justifyContent="center">
        <BoxPressable
          style={{position: 'absolute'}}
          top={0}
          left={0}
          width={'100%'}
          height={'100%'}
          onPress={modalProps.onRequestClose}
        />
        <Box bg="primaryBg" borderRadius={10} marginHorizontal={34} p={24}>
          <Text preset="pLarge" bold mb={24}>
            Filtros
          </Text>

          <Text preset="pMedium">Categoria</Text>
          <FlatList
            data={category}
            numColumns={3}
            keyExtractor={item => item}
            renderItem={({item: categoryItem}) => (
              <Controller
                control={control}
                name="category"
                render={({field}) => (
                  <Filter
                    label={categoryItem}
                    isActive={
                      field.value.toLowerCase() === categoryItem.toLowerCase()
                    }
                    mr={14}
                    mt={8}
                    onPress={() =>
                      categoryItem.toLowerCase() === field.value.toLowerCase()
                        ? field.onChange('')
                        : field.onChange(categoryItem)
                    }
                  />
                )}
              />
            )}
          />

          <Text preset="pMedium" mt={24}>
            Músculos
          </Text>

          <FlatList
            data={muscles}
            numColumns={3}
            keyExtractor={item => item}
            renderItem={({item: muscleItem}) => (
              <Controller
                control={control}
                name="muscle"
                render={({field}) => (
                  <Filter
                    label={muscleItem}
                    isActive={
                      muscleItem.toLowerCase() === field.value.toLowerCase()
                    }
                    onPress={() =>
                      muscleItem.toLowerCase() === field.value.toLowerCase()
                        ? field.onChange('')
                        : field.onChange(muscleItem)
                    }
                    mr={14}
                    mt={8}
                  />
                )}
              />
            )}
          />

          <Button
            onPress={control.handleSubmit(data => filterExercises(data))}
            label="Aplicar"
            mt={24}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(FilterExercise);
