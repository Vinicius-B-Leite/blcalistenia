import React from 'react';
import { Modal, ModalProps } from 'react-native';
import * as S from './styles'



type Props = ModalProps
const ThemeSelect: React.FC<Props> = (props) => {
    return (
        <Modal {...props}>
            <S.Container >
                <S.Close onPress={props.onRequestClose}/>
                <S.Main>

                    <S.OptionContainer>
                        <S.OptionCircleBorder selected={true}>
                            <S.OptionCircle selected={true} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={true}>Escuro</S.OptionName>
                    </S.OptionContainer>

                    <S.OptionContainer>
                        <S.OptionCircleBorder selected={false}>
                            <S.OptionCircle selected={false} />
                        </S.OptionCircleBorder>
                        <S.OptionName selected={false}>Claro</S.OptionName>
                    </S.OptionContainer>


                </S.Main>
            </S.Container>
        </Modal>
    )
}

export default ThemeSelect;