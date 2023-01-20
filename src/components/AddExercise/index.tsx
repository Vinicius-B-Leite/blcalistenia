import React, { useEffect, useContext } from 'react';
import { View, ModalProps, Modal } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components';
import { ExerciseContext } from '../../Contexts/ExerciseContext';

type Props = ModalProps

const AddExercise: React.FC<Props> = (props) => {
    const theme = useTheme()
    const { getExercises, exercisList } = useContext(ExerciseContext)
    useEffect(() => {
        getExercises()
    }, [])

    return (
        <Modal {...props}>
            <S.Container>
                <S.Header>
                    <S.GoBack onPress={props.onRequestClose}>
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
                        renderItem={({ item }) => {
                            return (
                                <S.ExerciseContainer>
                                    <S.ExerciseName>{item.name}</S.ExerciseName>
                                    <S.ExerciseMuscles>{item.muscles}</S.ExerciseMuscles>
                                </S.ExerciseContainer>
                            )
                        }}
                    />
                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default AddExercise;