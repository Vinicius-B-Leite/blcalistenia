import React from 'react';
import { View } from 'react-native';
import { WorkoutType } from '../../models/workout';
import * as S from './styles'

type Props = {
    data: WorkoutType,
}

const Workout: React.FC<Props> = ({ data }) => {
    return (
        <S.Container>
            <S.Banner
                source={{ uri: data.banner }}
                resizeMode='cover'
            />
            <S.TextContainer>
                <S.Text >{data.title}</S.Text>
            </S.TextContainer>
        </S.Container>
    )
}

export default Workout;