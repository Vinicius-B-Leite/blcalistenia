import React, { useContext, useState, useCallback, useEffect } from 'react';
import Container from '../../components/Container';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import Workout from '../../components/Workout';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CalendarDaysTrained from '../../components/CalendarDaysTrained';
import { RootStackParamList } from '../../routes/Models';
import { StackNavigationProp } from '@react-navigation/stack';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import { SuggestWorkoutContext } from '../../contexts/SuggestWorkoutContex';
import { WorkoutLevel } from '../../models/SuggestsWorkoutType';
import { useRealm } from '../../contexts/RealmContext';
import { useUser } from '../../contexts/AuthContext';

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>

const Home: React.FC = () => {
    const theme = useTheme()
    const navigation = useNavigation<Navigation>()
    const { getWorkoutsList, workoutsList, filterWorkoutByMuscle } = useContext(WorkoutContext)
    const { getSuggestsWorkouts, suggestsWorkouts } = useContext(SuggestWorkoutContext)
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false)
    const [searchWorkoutInput, setSearchWorkoutInput] = useState('')
    const [muscleFilterSelected, setMuscleFilterSelected] = useState('Todos')
    const [workoutLeveSuggest, setWorkoutLevelSuggest] = useState<WorkoutLevel>('begginer')
    const { realm } = useRealm()
    const { user } = useUser()


    useEffect(() => {
        getSuggestsWorkouts(workoutLeveSuggest)
    }, [realm])

    useEffect(() => {
        getWorkoutsList(searchWorkoutInput)
    }, [searchWorkoutInput, realm])


    const handleSelectMuscleFilter = (muscle: string) => {
        setMuscleFilterSelected(muscle)
        filterWorkoutByMuscle(muscle)
    }
    return (
        <Container>
            <CalendarDaysTrained closeCalendar={() => setCalendarVisible(false)} visible={calendarVisible} />
            <S.Header>
                <S.Left onPressIn={() => navigation.navigate('Profile')} >
                    <S.Avatar source={{ uri: user.photoURI }} />

                    <S.TextContainer>
                        <S.Welcome>Bem-vindo</S.Welcome>
                        <S.Username>{user.username}</S.Username>
                    </S.TextContainer>

                </S.Left>

                <S.Right onPressIn={() => setCalendarVisible(true)}>
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
                    renderItem={({ item }) => <Muscle muscle={item} muscleSelected={muscleFilterSelected} onClick={(m) => handleSelectMuscleFilter(m)} />}
                />
                <S.WorkoutList
                    data={workoutsList}
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