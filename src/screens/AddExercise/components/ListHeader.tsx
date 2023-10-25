import React from 'react';
import * as S from './style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import { setSearchInput } from '../../../features/Exercises/exerciseSlicer';
import { useAppNavigation } from '@/hooks/useAppNavigation';


const ListHeader: React.FC = () => {
    const navigation = useAppNavigation()
    const theme = useTheme()

    const searchExerciseInput = useSelector((state: RootState) => state.exercise.searchInput)
    const dispatch = useDispatch()

    return (
        <S.Header>
            <S.GoBack onPressIn={() => navigation.goBack()}>
                <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.text} />
            </S.GoBack>
            <S.InputArea>
                <S.Input
                    value={searchExerciseInput}
                    onChangeText={(text) => dispatch(setSearchInput(text))}
                    placeholder='Pesquisar exercício'
                    placeholderTextColor={theme.colors.darkText}
                    textAlign='right'
                />
                <AntDesign
                    name='search1'
                    size={theme.sizes.icons.sm}
                    color={theme.colors.darkText}
                    style={{ marginLeft: '5%' }} />
            </S.InputArea>
        </S.Header>
    )
}

export default ListHeader;