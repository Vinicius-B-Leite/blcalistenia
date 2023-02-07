import React, { useContext, useEffect, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native'
import Container from '../../components/Container';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import Workout from '../../components/Workout';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { useFocusEffect } from '@react-navigation/native';
import CalendarDaysTrained from '../../components/CalendarDaysTrained';


const Home: React.FC = () => {
    const theme = useTheme()
    const { getWorkoutsList, workoutsList } = useContext(WorkoutContext)
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false)

    useFocusEffect(useCallback(() => {
        getWorkoutsList()
    }, []))
    return (
        <Container> 
            <CalendarDaysTrained  closeCalendar={() => setCalendarVisible(false)} visible={calendarVisible} />
            <S.Header>
                <S.Left>
                    <S.Avatar source={{ uri: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' }} />

                    <S.TextContainer>
                        <S.Welcome>Bem-vindo</S.Welcome>
                        <S.Username>Vincius B Leite</S.Username>
                    </S.TextContainer>

                </S.Left>

                <S.Right onPress={() => setCalendarVisible(true)}>
                    <AntDesign size={theme.sizes.icons.md} color={theme.colors.text} name='calendar' />
                </S.Right>
            </S.Header>

            <S.WorkoutContainer>
                <S.Title>Seus treinos</S.Title>
                <S.InputArea>
                    <AntDesign name='search1' color={theme.colors.text} size={theme.sizes.icons.sm} />
                    <S.Input
                        placeholder='Pesquisar treino'
                        placeholderTextColor={theme.colors.darkText}
                    />
                </S.InputArea>

                <S.CategotyList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={muscles}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <Muscle muscle={item} />}
                />
                <S.WorkoutList
                    data={workoutsList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
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
                    data={workoutsList}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item, index }) => <Workout data={item} />}
                />
            </S.WorkoutContainer>
        </Container>
    )
}

export default Home;