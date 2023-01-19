import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { muscles } from '../../utils/muscles';
import Muscle from '../../components/Muscle';
import MyWorkout from '../../components/MyWorkout';
import { Workout, Workouts } from '../../models/workout';
import CreateWorkoutButton from '../../components/CreateWorkoutButton';
import { getRealm } from '../../services/realm';
import { Results } from 'realm';



const Home: React.FC = () => {
    const theme = useTheme()
    const [workoutsList, setWorkoutList] = useState<Workout[]>();

    useEffect(() => {

        async function createWorkout() {
            const realm = await getRealm()

            let workout;

            realm.write(() => {
                workout = realm.create<Workout>('Workout', {
                    _id: 0,
                    title: 'Handstand Push up',
                    banner: 'https://i1.sndcdn.com/artworks-3cmYJ11oNtnjKDIp-YAQ2fw-t500x500.jpg',
                    exercises: [
                        {
                            name: 'Handstand push up',
                            type: 'rep',
                            _id: 1,
                            series: [
                                {
                                    rep: 1,
                                    rest: 60 * 2,
                                    serie: 1
                                }
                            ]
                        }
                    ]

                })
            })
            realm.close()
            console.log(workout)

        }

        async function getWorkouts() {

            const realm = await getRealm()

            const w = realm.objects<Workout[]>('Workout').sorted('title').toJSON()
            console.log("🚀 ~ file: index.tsx:59 ~ getWorkouts ~ w", w)

            setWorkoutList(w as Workout[])
        }

        getWorkouts()
    }, [])
    return (
        <Container>
            <S.Header>
                <S.Left>
                    <S.Avatar source={{ uri: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' }} />

                    <S.TextContainer>
                        <S.Welcome>Bem-vindo</S.Welcome>
                        <S.Username>Vincius B Leite</S.Username>
                    </S.TextContainer>

                </S.Left>

                <S.Right>
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
                    renderItem={({ item }) => <MyWorkout data={item} />}
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
                    renderItem={({ item, index }) => <MyWorkout data={item} />}
                />
            </S.WorkoutContainer>
        </Container>
    )
}

export default Home;