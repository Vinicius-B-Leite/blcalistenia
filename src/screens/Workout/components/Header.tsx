import React, { useState } from 'react';
import { Alert } from 'react-native'
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Models';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import BackgroundService from 'react-native-background-actions'
import { resetTimer, setWorkout } from '../../../features/Workout/workoutSlicer';
import { useRealm } from '../../../contexts/RealmContext';
import { WorkoutType } from '../../../models/WorkoutType';
import { addWorkout } from '../../../features/WorkoutList/workoutListSlicer';
import { ExerciseType } from '../../../models/ExerciseType';
import { ExercisesInWorkoutType } from '../../../models/ExercisesInWorkoutType';


type Nav = NavigationProp<RootStackParamList>
type Props = {

}
const Header: React.FC<Props> = ({ }) => {


    const theme = useTheme()
    const navigation = useNavigation<Nav>()
    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)
    const dispatch = useDispatch()
    const { realm } = useRealm()

    const workout = useSelector((state: RootState) => state.workout.workout)


    const cancelWorkout = () => {
        Alert.alert(
            'Deseja cancelar o treino',
            'Você deseja cancelar o treino?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        BackgroundService.stop()
                            .then(() => {
                                dispatch(resetTimer())
                                navigation.goBack()
                            })
                    }
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }

    const saveWorkout = () => {
        realm?.write(() => {
            const newWorkout = realm.create<WorkoutType>(
                'Workout',
                {
                    _id: workout._id,
                    anotation: workout.anotation,
                    exercises: workout.exercises,
                    title: workout.title,
                    banner: ''
                },
                Realm.UpdateMode.Modified)
            dispatch(addWorkout(newWorkout.toJSON() as WorkoutType))
            navigation.navigate('Home')
        })

    }
    return (
        <S.Header>
            <S.Left>
                <S.GoBack onPressIn={() => navigation.navigate('Home')}>
                    <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.GoBack>
                <S.Title
                    value={workout.title}
                    onChangeText={(txt) => dispatch(setWorkout({ ...workout, title: txt }))}
                    placeholder='Título do treino'
                    placeholderTextColor={theme.colors.darkContrast}
                />
            </S.Left>
            {
                isWorkingout ? (
                    <S.CancelWorkoutBtn onPress={cancelWorkout}>
                        <S.CancelWorkoutTxt>Cancelar</S.CancelWorkoutTxt>
                    </S.CancelWorkoutBtn>
                ) : (
                    <S.ImagePickerButton onPressIn={saveWorkout}>
                        <Feather name='save' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                    </S.ImagePickerButton>

                )
            }
        </S.Header>
    )
}

export default Header;