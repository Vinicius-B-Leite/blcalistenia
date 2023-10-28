import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ExerciseInWorkoutItem from '../../../../components/ExerciseInWorkoutItem';
import * as S from '../styles'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../features/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../routes/Models';
import { addSerie, removeExercise } from '@/features/Workout/workoutSlicer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTheme } from 'styled-components/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useAppSelector } from '@/hooks/useAppSelector';




const ExerciseList: React.FC = () => {
    const theme = useTheme()

    const workout = useAppSelector((state) => state.workout.workout)
    const navigation = useAppNavigation()
    const dispatch = useDispatch()

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
                        createSerieBtn={
                            <S.CreateNewSerieButton onPress={() => dispatch(addSerie(item))}>
                                <S.CreateNewSerieText>+</S.CreateNewSerieText>
                            </S.CreateNewSerieButton>
                        }
                        showDeleteSerieButton={true}
                        deleteExerciseBtn={
                            <TouchableOpacity onPress={() => dispatch(removeExercise(item))}>
                                <FontAwesome name='trash' size={theme.sizes.icons.sm} color={theme.colors.alert} />
                            </TouchableOpacity>
                        }
                    />
                )}
                ListFooterComponent={() => (
                    <S.AddExerciseButton onPress={() => navigation.navigate('HomeStack', { screen: 'AddExercise' })}>
                        <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                    </S.AddExerciseButton>
                )}
            />
        </S.ExercisesContainer>
    )
}

export default ExerciseList;