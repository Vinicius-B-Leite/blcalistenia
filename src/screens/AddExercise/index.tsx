import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as S from './styles'
import { ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { BottomSheetRefProps } from '../../components/BottomSheet';
import Exercise from '../../components/Exercise';
import BottomSheet from '../../components/BottomSheet';
import CreateExercise from '../../components/CreateExercise';
import FilterExercise from '../../components/FilterExercise';
import { ExerciseType } from '../../models/ExerciseType';
import { initialsExercises } from '../../utils/initialsExercises';
import { FlashList } from '@shopify/flash-list';
import { WorkoutType } from '../../models/WorkoutType';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useRealm } from '../../services/realm';
import *  as uuid from 'react-native-uuid'


type Navigation = StackScreenProps<RootStackParamList, 'AddExercise'>
export type FilterType = { category: string, muscles: string }

const AddExercise: React.FC<Navigation> = ({ navigation }) => {
    const theme = useTheme()
    const realm = useRealm()

    const bottomSheetRef = useRef<BottomSheetRefProps>(null)

    const [filterExerciseVisible, setFilterExercciseVisible] = useState(false)
    const [filters, setFilters] = useState<FilterType>({ category: 'empurrar', muscles: 'Peitoral' })

    const [searchExerciseInput, setSearchExerciseInput] = useState<string>('')
    const exercisesSearched = useMemo(() => {
        const exercises = realm?.objects('Exercise').toJSON() as ExerciseType[]

        return exercises?.filter(e => e.name.toLocaleLowerCase().includes(searchExerciseInput?.toLocaleLowerCase()))
    }, [searchExerciseInput])

    const [exercisList, setExerciseList] = useState([...useQuery('Exercise').toJSON(), ...initialsExercises] as ExerciseType[])



    const filterExercises = (category: string, muscle: string) => {
        const exerciesesFiltereds = realm.objects('Exercise')
            .filtered(`categories CONTAINS  '${category}'`)
            .filtered(`muscles CONTAINS '${muscle}'`)
            .toJSON() as ExerciseType[]
        console.log("🚀 ~ file: index.tsx:50 ~ filterExercises ~ exerciesesFiltereds:", exerciesesFiltereds)
        setExerciseList([...exerciesesFiltereds])
    }

    return (
        <S.Container>
            <S.Header>
                <S.GoBack onPressIn={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.text} />
                </S.GoBack>
                <S.InputArea>
                    <S.Input
                        value={searchExerciseInput}
                        onChangeText={(text) => setSearchExerciseInput(text)}
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
                <S.ExerciseListContainer>
                    <FlashList
                        estimatedItemSize={15}
                        data={searchExerciseInput ? exercisesSearched : exercisList}
                        keyExtractor={item => String(item.name)}
                        renderItem={({ item }) => <Exercise item={item} />}
                        ListHeaderComponent={() => (
                            <S.FilterButton onPressIn={() => setFilterExercciseVisible(true)}>
                                <S.FilterText>Filtros</S.FilterText>
                            </S.FilterButton>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </S.ExerciseListContainer>
            </S.Main>

            <S.FloatButton onPressIn={() => bottomSheetRef?.current?.scrollTo({ destination: theme.sizes.vh / 5, duration: 1000 })}>
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
                onApply={() => {
                    filterExercises(filters.category, filters.muscles)
                    setFilterExercciseVisible(false)
                }}
            />
        </S.Container>
    )
}

export default AddExercise;