import React, {memo, useState} from 'react';
import {Modal, ModalProps, FlatList} from 'react-native';
import {FilterType} from '../..';
import {category} from '../../../../utils/category';
import {muscles} from '../../../../utils/muscles';

import {initialsExercises} from '../../../../utils/initialsExercises';
import {useDispatch} from 'react-redux';
import {setExercises} from '../../../../features/Exercises/exerciseSlicer';
import FilterItem from './components/FilterItem';
import {useGetExercises} from '@/domains/Exercise/useCases/useGetExercises';
import Box, {BoxPressable} from '@/components/Box/Box';
import Text from '@/components/Text/Text';
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button/Button';

type FilterExerciseProps = {
  modalProps: ModalProps;
  closeModal: () => void;
};
const FilterExercise: React.FC<FilterExerciseProps> = ({
  modalProps,
  closeModal,
}) => {
  const [filters, setFilters] = useState<FilterType>({
    category: 'empurrar',
    muscles: 'Peitoral',
  });

  const dispatch = useDispatch();
  const {exercises} = useGetExercises();

  const filterExercises = () => {
    const exerciesesRealm = [...exercises, ...initialsExercises];
    const exericesesFiltered = exerciesesRealm.filter(v => {
      let copy = v;
      const categoryFiltered = copy.categories.includes(
        filters.category.toLowerCase(),
      );
      const exercisesFiltered = copy.muscles.includes(
        filters.muscles.toLowerCase(),
      );

      if (filters.category && filters.muscles) {
        return categoryFiltered && exercisesFiltered;
      }
      if (filters.category) {
        return categoryFiltered;
      }
      if (filters.muscles) {
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
              <Filter
                label={categoryItem}
                isActive={
                  categoryItem.toLowerCase() === filters.category.toLowerCase()
                }
                mr={14}
                mt={8}
                onPress={() =>
                  setFilters(old => ({...old, category: categoryItem}))
                }
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
              <Filter
                label={muscleItem}
                isActive={
                  muscleItem.toLowerCase() === filters.muscles.toLowerCase()
                }
                onPress={() =>
                  setFilters(old => ({...old, muscles: muscleItem}))
                }
                mr={14}
                mt={8}
              />
            )}
          />

          <Button onPress={filterExercises} label="Aplicar" mt={24} />
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(FilterExercise);
