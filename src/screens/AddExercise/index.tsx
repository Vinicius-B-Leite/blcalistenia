import React, { useEffect, useContext, useCallback, useRef, useState } from 'react';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { BottomSheetRefProps } from '../../components/BottomSheet';
import Exercise from '../../components/Exercise';
import BottomSheet from '../../components/BottomSheet';
import CreateExercise from '../../components/CreateExercise';
import FilterExercise from '../../components/FilterExercise';


type Navigation = StackScreenProps<RootStackParamList, 'AddExercise'>
export type FilterType = { category: string, muscles: string }
const AddExercise: React.FC<Navigation> = ({ navigation }) => {
    const theme = useTheme()
    const { getExercises, exercisList, filterExercises } = useContext(ExerciseContext)
    const bottomSheetRef = useRef<BottomSheetRefProps>(null)
    const [searchExerciseInput, setSearchExerciseInput] = useState('')
    const [filterExerciseVisible, setFilterExercciseVisible] = useState(false)
    const [filters, setFilters] = useState<FilterType>({ category: 'empurrar', muscles: 'Peitoral' })

    useEffect(() => {
        getExercises(searchExerciseInput)
    }, [searchExerciseInput])

    return (
        <S.Container>
            <S.Header>
                <S.GoBack onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.text} />
                </S.GoBack>
                <S.InputArea>
                    <S.Input
                        value={searchExerciseInput}
                        onChangeText={setSearchExerciseInput}
                        placeholder='Pesquisar exercício'
                        placeholderTextColor={theme.colors.darkText}
                        textAlign='right'
                    />
                    <AntDesign
                        name='search1'
                        size={theme.sizes.icons.sm}
                        color={theme.colors.darkText}
                        style={{ marginLeft: '5%' }} />
                </S.InputArea>
            </S.Header>

            <S.Main>
                <S.FilterButton onPress={() => setFilterExercciseVisible(true)}>
                    <S.FilterText>Filtros</S.FilterText>
                </S.FilterButton>


                <S.ExerciseList
                    data={exercisList}
                    extraData={exercisList}
                    keyExtractor={item => String(item.name)}
                    renderItem={({ item }) => <Exercise item={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </S.Main>

            <S.FloatButton onPress={() => {
                bottomSheetRef?.current?.scrollTo(theme.sizes.vh / 5, 1000)
            }}>
                <S.FloatButtonIcon>+</S.FloatButtonIcon>
            </S.FloatButton>


            <BottomSheet ref={bottomSheetRef}>
                <CreateExercise />
            </BottomSheet>

            <FilterExercise
                filters={filters}
                modalProps={{
                    visible: filterExerciseVisible,
                    transparent: true,
                    onRequestClose: () => setFilterExercciseVisible(false),
                    animationType: 'fade'
                }}
                onSelectCategoty={(category) => setFilters(old => ({ ...old, category: category }))}
                onSelectMuscle={(muscle) => setFilters(old => ({ ...old, muscles: muscle }))}
                onApply={() => filterExercises(filters.category, filters.muscles).then(() => setFilterExercciseVisible(false))}
            />
        </S.Container>



    )
}

export default AddExercise;