import React, { useContext } from 'react';
import { Modal, ModalProps } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import * as S from './styles'



type Props = ModalProps
const ThemeSelect: React.FC<Props> = (props) => {
    const { toggleTheme, theme } = useContext(ThemeContext)

    const isDarkSelected = theme === 'dark'
    const isLightSelected = theme === 'light'

    return (
        <Modal {...props}>
            <S.Container >
                <S.Close onPress={props.onRequestClose} />
                <S.Main>

                    <S.OptionContainer onPress={() => toggleTheme('dark')}>
                        <S.OptionCircleBorder selected={isDarkSelected}>
                            <S.OptionCircle selected={isDarkSelected} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={isDarkSelected}>Escuro</S.OptionName>
                    </S.OptionContainer>

                    <S.OptionContainer onPress={() => toggleTheme('light')}>
                        <S.OptionCircleBorder selected={isLightSelected}>
                            <S.OptionCircle selected={isLightSelected} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={isLightSelected}>Claro</S.OptionName>
                    </S.OptionContainer>


                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default ThemeSelect;