import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native'
import * as S from '../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { RootStackParamList } from '../../../../routes/Models';
import useWorkoutHeader from './useWorkoutHeader';
import { useNavigation } from '@react-navigation/native';




const Header: React.FC = () => {

    const theme = useTheme()
    const navigation = useNavigation()


    const { handleSelectImage, isWorkingout, workout, onChangeTitleText, cancelWorkout } = useWorkoutHeader()


    return (
        <S.Header>
            <S.Left>
                <S.GoBack onPressIn={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.GoBack>
                <S.Title
                    value={workout.title}
                    onChangeText={onChangeTitleText}
                    placeholder='Título do treino'
                    placeholderTextColor={theme.colors.darkContrast}
                />
            </S.Left>
            {
                isWorkingout ? (
                    <S.CancelWorkoutBtn onPress={cancelWorkout}>
                        <S.CancelWorkoutTxt>Cancelar</S.CancelWorkoutTxt>
                    </S.CancelWorkoutBtn>
                ) : (
                    <S.ButtonContainer onPress={handleSelectImage}>
                        <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                    </S.ButtonContainer>
                )
            }
        </S.Header>
    )
}

export default Header;