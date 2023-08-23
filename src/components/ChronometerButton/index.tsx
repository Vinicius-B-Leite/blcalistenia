import React from 'react';
import * as S from './styles'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import BackgroundService from 'react-native-background-actions'
import { resetTimer, setWorkout, updateTimer } from '../../features/Workout/workoutSlicer';
import { options, sleep } from '../../utils/backgroundActionsConfig';
import { WorkoutType } from '../../models/WorkoutType';
import { HistoricType } from '../../models/HistoricType';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Models';
import { useRealm } from '../../services/realm';
import { useUser } from '@realm/react';
import { addWorkout } from '../../features/WorkoutList/workoutListSlicer';


type Nav = NavigationProp<RootStackParamList>

const ChronometerButton: React.FC = ({ }) => {
    const timer = useSelector((state: RootState) => state.workout.timer)
    const dispatch = useDispatch()
    const workout = useSelector((state: RootState) => state.workout.workout)
    const realm = useRealm()
    const user = useUser()
    const navigation = useNavigation<Nav>()

    const everyIntensiveTask = async () => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            dispatch(updateTimer(i))
            BackgroundService.updateNotification({
                taskDesc: `Tempo atual: ${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`
            })
            await sleep(1000);
        }
    };

    const finishWorkout = () => {
        const isWorkoutSuggest = workout._id.includes('suggestWorkout')
        BackgroundService.stop().then(() => {
            realm?.write(() => {
                realm.create<HistoricType>('Historic', {
                    workout: JSON.stringify(workout),
                    date: new Date(),
                    timerInSeconds: timer as number,
                    _id: realm.objects('Historic').length + 1,
                    user_id: user.id
                })

                if (!isWorkoutSuggest) {
                    realm.create<WorkoutType>(
                        'Workout',
                        {
                            _id: workout._id,
                            anotation: workout.anotation,
                            exercises: workout.exercises,
                            title: workout.title,
                            banner: workout.banner || '',
                            user_id: user.id
                        },
                        Realm.UpdateMode.Modified)
                }

                dispatch(resetTimer())
                dispatch(setWorkout({} as WorkoutType))
                dispatch(addWorkout(workout))
                navigation.navigate('Home')
            })
        })
    }
    const handleFinishWorkout = () => {
        Alert.alert(
            'Encerrar o treino',
            'Você deseja encerrar o treino?',
            [
                {
                    text: 'Sim',
                    onPress: finishWorkout
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }

    const startWorkout = async () => {
        await BackgroundService.start(everyIntensiveTask, options)
    }

    return (
        <S.finishWorkout onPressIn={() => timer ? handleFinishWorkout() : startWorkout()}>
            {
                timer ? (
                    <S.FineshText>Terminar treino {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.FineshText>
                )
                    : (
                        <S.FineshText>Iniciar treino</S.FineshText>
                    )
            }
        </S.finishWorkout>
    )
}

export default ChronometerButton;