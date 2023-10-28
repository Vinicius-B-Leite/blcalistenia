import React, { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { WorkoutType } from '../../models/WorkoutType';
import * as S from './styles'
import { useAppNavigation } from '@/hooks/useAppNavigation';
import useWorkout from './useWorkout';
import ImageNotFound from '@/assets/imageNotFound.png'


type Props = {
    workout: WorkoutType,
}


const Workout: React.FC<Props> = ({ workout }) => {
    const navigation = useAppNavigation()
    const { handleDelete } = useWorkout()


    return (
        <S.Container
            onPress={() => navigation.navigate('HomeStack', { screen: 'Workout', params: { workout: workout } })}
            onLongPress={() => handleDelete(workout.title, workout._id)}>
            <S.Banner
                source={workout.banner.length > 0 ? { uri: workout.banner } : ImageNotFound}
                resizeMode={FastImage.resizeMode.cover}

            />
            <S.TextContainer>
                <S.Text >{workout.title}</S.Text>
            </S.TextContainer>
        </S.Container>
    )
}

export default memo(Workout, (p, n) => Object.is(p, n));