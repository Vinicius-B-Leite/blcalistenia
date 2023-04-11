import React, { useState, useCallback, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import Workout from '../../components/Workout';
import { useNavigation } from '@react-navigation/native';
import CalendarDaysTrained, { CalendarRef } from '../../components/CalendarDaysTrained';
import { RootStackParamList } from '../../routes/Models';
import { StackNavigationProp } from '@react-navigation/stack';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import { SuggestWorkoutType, WorkoutLevel } from '../../models/SuggestsWorkoutType';
import { useRealm } from '../../contexts/RealmContext';
import { useUser } from '../../contexts/AuthContext';
import { WorkoutType } from '../../models/WorkoutType';
import { ExerciseType } from '../../models/ExerciseType';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { setWorkoutList } from '../../features/WorkoutList/workoutListSlicer'
import { suggests } from '../../utils/suggestsWorkout';


type Navigation = StackNavigationProp<RootStackParamList, 'Home'>



const Home: React.FC = () => {
    const theme = useTheme()
    const { realm } = useRealm()
    const navigation = useNavigation<Navigation>()
    const { user } = useUser()

    const workoutList = useSelector((state: RootState) => state.workoutList.workouts)
    const dispatch = useDispatch()

    const calendarRef = useRef<CalendarRef>(null)

    const [suggestsWorkouts, setSuggestsWorkouts] = useState<WorkoutType[]>([])
    const [searchWorkoutInput, setSearchWorkoutInput] = useState('')
    const [muscleFilterSelected, setMuscleFilterSelected] = useState('Todos')
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('begginer')

    useEffect(() => {
        getWorkoutsList(searchWorkoutInput, muscleFilterSelected)
    }, [realm, searchWorkoutInput, muscleFilterSelected])

    useEffect(() => {
        getSuggestsWorkouts(workoutLeveSuggest)
    }, [realm])

    const getWorkoutsList = useCallback(async (text?: string, muscle?: string) => {
        if (realm) {
            let workouts = realm.objects<WorkoutType[]>('Workout').toJSON() as WorkoutType[]

            if (muscle === 'Todos') {
                dispatch(setWorkoutList(workouts))
                return
            }

            if (text && text.length > 1) {
                filterWorkoutsBySearch(workouts, text)
                return
            }

            if (muscle && muscle.length) {
                filterWorkoutsByMuscle(workouts, muscle)
                return
            }

            dispatch(setWorkoutList(workouts as WorkoutType[]))
        }
    }, [realm])

    const filterWorkoutsByMuscle = (workouts: WorkoutType[], muscle: string) => {
        const exercises = realm?.objects('Exercise').toJSON() as ExerciseType[]
        const exercisesHaveMuscleSelected = exercises.filter(e => e.muscles.includes(muscle))
        let workoutsWithMuscleSelected: WorkoutType[] = []
        workouts.forEach(w => {
            w.exercises.forEach(e => {
                const index = exercisesHaveMuscleSelected.findIndex(v => v.name == e.exercise_id)
                if (index > -1) workoutsWithMuscleSelected.push(w)
            })
        })
        dispatch(setWorkoutList(workoutsWithMuscleSelected))
    }
    const filterWorkoutsBySearch = (workouts: WorkoutType[], text: string) => {
        workouts = realm?.objects<WorkoutType[]>('Workout').filtered(`title CONTAINS '${text}'`).toJSON() as WorkoutType[]
        dispatch(setWorkoutList(workouts))
    }

    const createSuggestsWorkouts = () => {
        if (realm) {

            let arraySuggests: SuggestWorkoutType[] = []

            suggests.forEach(w => {
                realm.write(() => {
                    let respose = realm.create<SuggestWorkoutType>('SuggestWorkout', {
                        id: w.id,
                        level: w.level,
                        workout: JSON.stringify(w.workout)
                    }).toJSON() as SuggestWorkoutType
                    arraySuggests.push(respose)
                })
            });

            let arraySuggestsWorkouts: WorkoutType[] = arraySuggests.map(s => JSON.parse(s.workout))
            return arraySuggestsWorkouts
        }
    }

    const getSuggestsWorkouts = (level: WorkoutLevel) => {

        if (realm) {
            const workouts = realm.objects<SuggestWorkoutType[]>('SuggestWorkout').filtered(`level == '${level}'`).toJSON() as SuggestWorkoutType[]

            if (workouts.length < 1) {
                const sw = createSuggestsWorkouts()
                sw && setSuggestsWorkouts(sw)
                return
            }
            setSuggestsWorkouts(workouts.map(w => JSON.parse(w.workout)))
        }
    }


    return (
        <Container>
            <CalendarDaysTrained ref={calendarRef} />
            <S.Header>
                <S.Left onPressIn={() => navigation.navigate('Profile')} >
                    <S.Avatar source={{ uri: user.photoURI }} />

                    <S.TextContainer>
                        <S.Welcome>Bem-vindo</S.Welcome>
                        <S.Username>{user.username}</S.Username>
                    </S.TextContainer>

                </S.Left>

                <S.Right onPressIn={() => calendarRef.current?.openCalendar()}>
                    <AntDesign size={theme.sizes.icons.md} color={theme.colors.text} name='calendar' />
                </S.Right>
            </S.Header>

            <S.WorkoutContainer>
                <S.Title>Seus treinos</S.Title>
                <S.InputArea>
                    <AntDesign name='search1' color={theme.colors.text} size={theme.sizes.icons.sm} />
                    <S.Input
                        value={searchWorkoutInput}
                        onChangeText={setSearchWorkoutInput}
                        placeholder='Pesquisar treino'
                        placeholderTextColor={theme.colors.darkText}
                    />
                </S.InputArea>

                <S.CategotyList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['Todos', ...muscles]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <Muscle muscle={item} muscleSelected={muscleFilterSelected} onClick={(m) => setMuscleFilterSelected(m)} />}
                />
                <S.WorkoutList
                    data={workoutList}
                    horizontal
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                    ListEmptyComponent={() => <ListEmptyComponent />}
                    ListHeaderComponent={() => <CreateWorkoutButton />}
                    renderItem={({ item }) => <Workout data={item} />}
                />
            </S.WorkoutContainer>

            <S.WorkoutContainer>
                <S.Row>
                    <S.Title>Treinos recomendados</S.Title>
                    <S.LevelButton>
                        <S.LevelText>iniciante</S.LevelText>
                    </S.LevelButton>
                </S.Row>
                <S.WorkoutList
                    data={suggestsWorkouts}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => <Workout data={item} />}
                />
            </S.WorkoutContainer>
        </Container>
    )
}

export default Home;