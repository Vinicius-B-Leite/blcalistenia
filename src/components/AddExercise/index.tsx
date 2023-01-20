import React from 'react';
import { View, ModalProps, Modal } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components';

type Props = ModalProps

const AddExercise: React.FC<Props> = (props) => {
    const theme = useTheme()

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
                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default AddExercise;