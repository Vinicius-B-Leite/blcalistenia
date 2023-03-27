import React from 'react';
import {  Modal, ModalProps, FlatList } from 'react-native';
import { FilterType } from '../../screens/AddExercise';
import { category } from '../../utils/category';
import { muscles } from '../../utils/muscles';
import * as S from './style'


type FilterExerciseProps = {
    modalProps: ModalProps,
    filters: FilterType,
    onSelectCategoty: (category: string) => void,
    onSelectMuscle: (muscle: string) => void,
    onApply: () => void
}
const FilterExercise: React.FC<FilterExerciseProps> = ({ filters, modalProps, onSelectCategoty, onSelectMuscle, onApply }) => {
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
                        renderItem={({ item }) => (
                            <S.ItemContainer selected={filters.category == item} onPress={() => onSelectCategoty(item)}>
                                <S.ItemLabel>{item}</S.ItemLabel>
                            </S.ItemContainer>
                        )}
                    />

                    <S.FilterTitle>Músculos</S.FilterTitle>
                    <FlatList
                        data={muscles}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <S.ItemContainer selected={filters.muscles == item} onPress={() => onSelectMuscle(item)}>
                                <S.ItemLabel >{item}</S.ItemLabel>
                            </S.ItemContainer>
                        )}
                    />

                    <S.ApplyFilter onPress={onApply}>
                        <S.ApplyText>Aplicar</S.ApplyText>
                    </S.ApplyFilter>
                </S.Main>
            </S.Container>
        </Modal>
    )

}

export default FilterExercise;