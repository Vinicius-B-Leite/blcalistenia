import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../routes/Models';
import * as S from './styles'
import { useAppNavigation } from '@/hooks/useAppNavigation';


const CreateWorkoutButton: React.FC = () => {

    const navigation = useAppNavigation()
    return (
        <S.Container onPressIn={() => navigation.navigate('HomeStack', { screen: 'Workout', params: { workout: undefined } })}>
            <S.Icon>+</S.Icon>
        </S.Container>
    )
}

export default CreateWorkoutButton;