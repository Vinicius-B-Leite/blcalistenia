import React, { useContext } from 'react';
import { Modal, ModalProps } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import * as S from './styles'



type Props = ModalProps
const ThemeSelect: React.FC<Props> = (props) => {
    const { toggleTheme, theme } = useContext(ThemeContext)
    return (
        <Modal {...props}>
            <S.Container >
                <S.Close onPress={props.onRequestClose} />
                <S.Main>

                    <S.OptionContainer onPress={() => toggleTheme('dark')}>
                        <S.OptionCircleBorder selected={theme == 'dark'}>
                            <S.OptionCircle selected={theme == 'dark'} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={theme == 'dark'}>Escuro</S.OptionName>
                    </S.OptionContainer>

                    <S.OptionContainer onPress={() => toggleTheme('light')}>
                        <S.OptionCircleBorder selected={theme == 'light'}>
                            <S.OptionCircle selected={theme == 'light'} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={theme == 'light'}>Claro</S.OptionName>
                    </S.OptionContainer>


                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default ThemeSelect;