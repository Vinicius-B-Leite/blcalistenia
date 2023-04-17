import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import { useRealm } from '../../contexts/RealmContext';
import { initialsExercises } from '../../utils/initialsExercises';
import { FlashList } from '@shopify/flash-list';
type Navigation = StackScreenProps<RootStackParamList, 'AddExercise'>
export type FilterType = { category: string, muscles: string }

const AddExercise: React.FC<Navigation> = ({ navigation }) => {
    const theme = useTheme()
    const { realm } = useRealm()

    const bottomSheetRef = useRef<BottomSheetRefProps>(null)

    const [exercisList, setExerciseList] = useState<ExerciseType[]>([])
    const [searchExerciseInput, setSearchExerciseInput] = useState<string | undefined>(undefined)
    const [filterExerciseVisible, setFilterExercciseVisible] = useState(false)
    const [filters, setFilters] = useState<FilterType>({ category: 'empurrar', muscles: 'Peitoral' })


    useEffect(() => {
        getExercises(searchExerciseInput)
    }, [searchExerciseInput])

    const getExercises = useCallback((text?: string) => {
        if (realm) {
            let exercises = realm.objects<ExerciseType[]>('Exercise').sorted('name').toJSON() as ExerciseType[]
            if (exercises.length === 0) {
                initialsExercises.forEach(exercise => {
                    createExercise(exercise)
                })
                return
            }
            if (text) {
                setExerciseList(exercises.filter(e => e.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())).sort())
                return
            }
            exercises.sort()
            setExerciseList(exercises)
        }
    }, [realm])
    const createExercise = useCallback(({ name, muscles, categories }: ExerciseType) => {

        if (realm) {

            realm.write(() => {
                const exerciseResponse = realm.create<ExerciseType>('Exercise', {
                    name,
                    muscles,
                    categories
                }).toJSON() as ExerciseType

                setExerciseList(old => [...old, exerciseResponse])
            })
        }
    }, [realm])
    const filterExercises = useCallback((category: string, muscle: string) => {
        if (realm) {
            const exerciesesFiltereds = realm.objects('Exercise')
                .filtered(`categories CONTAINS  '${category}'`)
                .filtered(`muscles CONTAINS '${muscle}'`)
                .toJSON() as ExerciseType[]

            setExerciseList([...exerciesesFiltereds])
        }

    }, [realm])
    const deleteExercise = useCallback((exerciseName: String) => {
        if (realm) {
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey('Exercise', exerciseName as string))
                setExerciseList(old => {
                    const index = old.findIndex((v) => v.name == exerciseName)
                    old.splice(index, 1)
                    return [...old]
                })
            })
        }
    }, [realm])


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
                <S.FilterButton onPressIn={() => setFilterExercciseVisible(true)}>
                    <S.FilterText>Filtros</S.FilterText>
                </S.FilterButton>


                <S.ExerciseListContainer>
                    <FlashList
                        estimatedItemSize={15}
                        data={exercisList}
                        ListEmptyComponent={() => (searchExerciseInput && searchExerciseInput?.length > 0) ? <ActivityIndicator size={theme.sizes.icons.md} color={theme.colors.contrast} /> : <></>}
                        keyExtractor={item => String(item.name)}
                        renderItem={({ item }) => <Exercise item={item} deleteExercise={(exerciseName) => deleteExercise(exerciseName)} />}
                        showsVerticalScrollIndicator={false}
                    />
                </S.ExerciseListContainer>
            </S.Main>

            <S.FloatButton onPressIn={() => {
                bottomSheetRef?.current?.scrollTo(theme.sizes.vh / 5, 1000)
            }}>
                <S.FloatButtonIcon>+</S.FloatButtonIcon>
            </S.FloatButton>


            <BottomSheet ref={bottomSheetRef}>
                <CreateExercise createExercise={createExercise} />
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