import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../routes/Models';
import * as S from './styles'

type ScreenProps = StackNavigationProp<RootStackParamList, 'Home'>

const CreateWorkoutButton: React.FC = () => {

    const navigation = useNavigation<ScreenProps>()
    return (
        <S.Container onPressIn={() => navigation.navigate('Workout', { workout: undefined })}>
            <S.Icon>+</S.Icon>
        </S.Container>
    )
}

export default CreateWorkoutButton;