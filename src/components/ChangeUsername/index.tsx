import React, { useContext, useState } from 'react';
import { Modal, ModalProps, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './style'
import { useUser } from '@realm/react';


type ChangeUsernameProps = ModalProps
const ChangeUsername: React.FC<ChangeUsernameProps> = (props) => {

    const { colors } = useTheme()
    const user = useUser()
    const [newName, setNewName] = useState('')

    const handleChangeName = async () => {
        if (newName.length > 0) {
            user.profile.name = newName
            ToastAndroid.show('Nome salvo', ToastAndroid.SHORT)
        }
    }
    return (
        <Modal {...props} >
            <S.CloseModal onPressIn={props.onRequestClose} />
            <S.Container>
                <S.Title>Alterar nome</S.Title>

                <S.Input
                    placeholder={user.profile.name}
                    value={newName}
                    onChangeText={setNewName}
                    placeholderTextColor={colors.darkText}
                />

                <S.Submit onPressIn={handleChangeName}>
                    <S.Label>Salvar</S.Label>
                </S.Submit>
            </S.Container>
        </Modal>
    )
}

export default ChangeUsername;