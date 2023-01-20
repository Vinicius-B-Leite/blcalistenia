import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkoutContext } from '../../Contexts/WorkoutContext';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'

type ScreenProps = StackNavigationProp<RootStackParamList, 'Home'>

const CreateWorkoutButton: React.FC= () => {

    const navigation = useNavigation<ScreenProps>()
    return (
        <S.Container onPress={() => navigation.navigate('CreateWorkout')}>
            <S.Icon>+</S.Icon>
        </S.Container>
    )
}

export default CreateWorkoutButton;