import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import ExerciseInWorkoutItem from '../../../components/ExerciseInWorkoutItem';
import * as S from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Models';



type Nav = NavigationProp<RootStackParamList>
const ExerciseList: React.FC = () => {
    const workout = useSelector((state: RootState) => state.workout.workout)
    const navigation = useNavigation<Nav>()
    return (
        <S.ExercisesContainer>
            <FlashList
                data={workout.exercises}
                extraData={workout.exercises}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                estimatedItemSize={workout?.exercises?.length || 10}
                renderItem={({ item }) => (
                    <ExerciseInWorkoutItem
                        item={item}
                        showCreateSerie={true}
                        showDeleteSerieButton={true}
                        showDeleteExerciseBtn={true}
                    />
                )}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />
        </S.ExercisesContainer>
    )
}

export default ExerciseList;