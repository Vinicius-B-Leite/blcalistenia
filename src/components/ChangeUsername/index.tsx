import React, { useContext, useState } from 'react';
import { Modal, ModalProps, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './style'
import { useUser } from '@realm/react';


type ChangeUsernameProps = ModalProps & {
    changeName: (newName: string) => Promise<void>
}
const ChangeUsername: React.FC<ChangeUsernameProps> = ({ changeName, ...props }) => {

    const { colors } = useTheme()
    const [newName, setNewName] = useState('')
    const user = useUser()

    return (
        <Modal {...props} >
            <S.CloseModal onPressIn={props.onRequestClose} />
            <S.Container>
                <S.Title>Alterar nome</S.Title>

                <S.Input
                    placeholder={user?.customData?.username as string || 'Desconhecido'}
                    value={newName}
                    onChangeText={setNewName}
                    placeholderTextColor={colors.darkText}
                />

                <S.Submit onPressIn={() => changeName(newName)}>
                    <S.Label>Salvar</S.Label>
                </S.Submit>
            </S.Container>
        </Modal>
    )
}

export default ChangeUsername;