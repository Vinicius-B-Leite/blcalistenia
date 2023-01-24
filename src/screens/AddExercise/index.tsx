import React, { useEffect, useContext, useCallback, useRef, useLayoutEffect, useState } from 'react';
import { View, ModalProps, FlatList } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreateExercise, { CreateExerciseRefProps } from '../../components/CreateExercise';
import Exercise from '../../components/Exercise';


type Navigation = StackScreenProps<RootStackParamList, 'AddExercise'>

const AddExercise: React.FC<Navigation> = ({ navigation }) => {
    const theme = useTheme()
    const { getExercises, exercisList } = useContext(ExerciseContext)
    const bottomSheetRef = useRef<CreateExerciseRefProps>(null)

    useEffect(() => {
        getExercises()
    }, [])

    

    return (
        <S.Container>
            <S.Header>
                <S.GoBack onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.text} />
                </S.GoBack>
                <S.InputArea>
                    <S.Input
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

            <S.Main>
                <S.FilterButton>
                    <S.FilterText>Filtros</S.FilterText>
                </S.FilterButton>


                <S.ExerciseList
                    data={exercisList}
                    keyExtractor={item => String(item.name)}
                    renderItem={({ item }) => <Exercise item={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </S.Main>

            <S.FloatButton onPress={() => {
                bottomSheetRef?.current?.scrollTo(theme.sizes.vh / 3, 1000)
            }}>
                <S.FloatButtonIcon>+</S.FloatButtonIcon>
            </S.FloatButton>

            {
                bottomSheetRef.current?.isVisible() && <S.FocusBackground />
            }

            <CreateExercise ref={bottomSheetRef} />
        </S.Container>



    )
}

export default AddExercise;