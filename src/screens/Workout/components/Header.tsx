import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native'
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Models';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import BackgroundService from 'react-native-background-actions'
import { resetTimer, setWorkout } from '../../../features/Workout/workoutSlicer';
import { WorkoutType } from '../../../models/WorkoutType';
import { addWorkout } from '../../../features/WorkoutList/workoutListSlicer';
import { useRealm } from '../../../services/realm';
import { pickeImage } from '../../../utils/pickImage';


type Nav = NavigationProp<RootStackParamList, 'Workout'>

const Header: React.FC = () => {


    const theme = useTheme()
    const navigation = useNavigation<Nav>()
    const realm = useRealm()

    const dispatch = useDispatch()
    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)
    const workout = useSelector((state: RootState) => state.workout.workout)

    const isWorkingoutRef = useRef(isWorkingout)
    isWorkingoutRef.current = isWorkingout

    const workoutRef = useRef(workout)
    workoutRef.current = workout

    const cancelWorkout = () => {
        Alert.alert(
            'Deseja cancelar o treino',
            'Você deseja cancelar o treino?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        BackgroundService.stop()
                            .then(() => {
                                dispatch(resetTimer())
                                navigation.navigate('Home')
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
        realm.write(() => {
            const newWorkout = realm.create<WorkoutType>(
                'Workout',
                {
                    _id: workoutRef.current._id,
                    anotation: workoutRef.current.anotation,
                    exercises: workoutRef.current.exercises,
                    title: workoutRef.current.title,
                    banner: workoutRef.current.banner || '',
                    user_id: workoutRef.current.user_id
                },
                Realm.UpdateMode.Modified)

            dispatch(addWorkout(newWorkout.toJSON() as WorkoutType))
            navigation.navigate('Home')
        })
    }

    const handleSelectImage = async () => {
        try {
            const res = await pickeImage()
            if (res.assets && res.assets[0].uri) {
                dispatch(setWorkout({ ...workout, banner: res.assets[0].uri }))
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', (event) => {
            if (event.data.action.type == 'GO_BACK' && !isWorkingoutRef.current) {
                saveWorkout()
            }
        })
    }, [])



    return (
        <S.Header>
            <S.Left>
                <S.GoBack onPressIn={() => navigation.goBack()}>
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
                    <S.ButtonContainer onPress={handleSelectImage}>
                        <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                    </S.ButtonContainer>
                )
            }
        </S.Header>
    )
}

export default Header;