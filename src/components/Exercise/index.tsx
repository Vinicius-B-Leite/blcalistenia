import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { ExerciseType } from '../../models/ExerciseType';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux'
import { addExercise } from '../../features/Workout/workoutSlicer'
import { useRealm } from '../../contexts/RealmContext';


type Prosp = { item: ExerciseType }

type Navigation = StackNavigationProp<RootStackParamList, 'AddExercise'>

const Exercise: React.FC<Prosp> = ({ item }) => {
    const navigation = useNavigation<Navigation>()
    const dispatch = useDispatch()
    const { realm } = useRealm()

    const deleteExercise = useCallback((exerciseName: String) => {
        if (realm) {
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey('Exercise', exerciseName as string))
            })
        }
    }, [realm])

    const handleAddExercise = useCallback(() => {
        dispatch(addExercise({ exercise_id: item.name, series: [{ rep: 0, rest: 0, serie: 1, done: false }] }))
        navigation.goBack()
    }, [])

    const handleDelete = () => {
        Alert.alert(
            'Deletar exercício',
            'Você deseja deletar o exercício ' + item.name,
            [
                {
                    text: 'Sim',
                    onPress: () => deleteExercise(item.name)
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ],
            {
                cancelable: true,
            }
        )
    }


    return (
        <S.ExerciseContainer onPress={handleAddExercise} onLongPress={handleDelete}>
            <S.ExerciseName>{item.name}</S.ExerciseName>
            <FlatList
                data={item.muscles}
                horizontal

                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item: m }) => (
                    <S.ExerciseMuscles>{m}</S.ExerciseMuscles>
                )}
            />
        </S.ExerciseContainer >
    )
}

export default memo(Exercise);