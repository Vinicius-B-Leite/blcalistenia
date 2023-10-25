import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TabParamList } from '../../routes/Models';
import { useAppNavigation } from '@/hooks/useAppNavigation';



type Nav = NavigationProp<TabParamList>

const GoBackToWorkout: React.FC = () => {
    const { colors, sizes } = useTheme()
    const navigation = useAppNavigation()

    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)
    const currentWorkout = useSelector((state: RootState) => state.workout.workout)
    const timer = useSelector((state: RootState) => state.workout.timer)

    if (!isWorkingout || !timer) {
        return <></>
    }

    return (
        <S.GoWorkout onPress={() => navigation.navigate('HomeStack', {
            screen: 'Workout', params: {
                workout: currentWorkout
            }
        })} >
            <View>
                <S.TitleGoWorkout>Voltar ao treino</S.TitleGoWorkout>
                <S.SubtitleGoWorkout >{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.SubtitleGoWorkout>
            </View>
            <Ionicons name='arrow-forward' color={colors.text} size={sizes.icons.xlg} />
        </S.GoWorkout>
    )
}

export default GoBackToWorkout;