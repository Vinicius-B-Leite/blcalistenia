import React, {memo, useState} from 'react';
import {Modal, ModalProps, FlatList} from 'react-native';
import {FilterType} from '../../screens/AddExercise';
import {category} from '../../utils/category';
import {muscles} from '../../utils/muscles';
import * as S from './style';

import {ExerciseType} from '../../models/ExerciseType';
import {initialsExercises} from '../../utils/initialsExercises';
import {useDispatch} from 'react-redux';
import {setExercises} from '../../features/Exercises/exerciseSlicer';
import FilterItem from './components/FilterItem';
import {useGetExercises} from '@/domains/Exercise/useCases/useGetExercises';

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
      <S.Container>
        <S.CloseModal onPress={modalProps.onRequestClose} />
        <S.Main>
          <S.Title>Filtros</S.Title>

          <S.FilterTitle>Categoria</S.FilterTitle>
          <FlatList
            data={category}
            numColumns={3}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <FilterItem
                item={item}
                isSelected={
                  item.toLowerCase() === filters.category.toLowerCase()
                }
                selectItem={categorySelected =>
                  setFilters(old => ({...old, category: categorySelected}))
                }
              />
            )}
          />

          <S.FilterTitle>Músculos</S.FilterTitle>
          <FlatList
            data={muscles}
            numColumns={3}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <FilterItem
                item={item}
                isSelected={
                  item.toLowerCase() === filters.muscles.toLowerCase()
                }
                selectItem={muscleSelected =>
                  setFilters(old => ({...old, muscles: muscleSelected}))
                }
              />
            )}
          />

          <S.ApplyFilter onPress={filterExercises}>
            <S.ApplyText>Aplicar</S.ApplyText>
          </S.ApplyFilter>
        </S.Main>
      </S.Container>
    </Modal>
  );
};

export default memo(FilterExercise);
