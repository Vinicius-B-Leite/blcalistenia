import * as S from '../../styles'
import Workout from '@/components/Workout';
import useWorkoutSuggest from './useWorkoutSuggest';


const WorkoutSuggest: React.FC = () => {
    const { handleChangeWorkoutLevel, workoutLeveSuggest, workoutSuggestFilteredByLevel } = useWorkoutSuggest()

    return (
        <S.WorkoutContainer>
            <S.Row>
                <S.Title>Treinos recomendados</S.Title>
                <S.LevelButton onPress={handleChangeWorkoutLevel}>
                    <S.LevelText>{workoutLeveSuggest === 'begginer' ? 'iniciante' : 'intermediário'}</S.LevelText>
                </S.LevelButton>
            </S.Row>
            <S.WorkoutList
                data={workoutSuggestFilteredByLevel}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Workout data={item} />}
            />
        </S.WorkoutContainer>
    )
}

export default WorkoutSuggest;