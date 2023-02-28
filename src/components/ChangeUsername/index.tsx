import React, { useContext, useState } from 'react';
import { Modal, ModalProps, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AuthContext } from '../../contexts/AuthContext';
import * as S from './style'


type ChangeUsernameProps = ModalProps
const ChangeUsername: React.FC<ChangeUsernameProps> = (props) => {

    const { user, changeName } = useContext(AuthContext)
    const { colors } = useTheme()
    const [newName, setNewName] = useState('')

    const handleChangeName = async () => {
        if (newName.length > 0) {
            await changeName(newName)
            ToastAndroid.show('Nome salvo', ToastAndroid.SHORT)
        }
    }
    return (
        <Modal {...props} >
            <S.CloseModal onPress={props.onRequestClose} />
            <S.Container>
                <S.Title>Alterar nome</S.Title>

                <S.Input
                    placeholder={user.username}
                    value={newName}
                    onChangeText={setNewName}
                    placeholderTextColor={colors.darkText}
                />

                <S.Submit onPress={handleChangeName}>
                    <S.Label>Salvar</S.Label>
                </S.Submit>
            </S.Container>
        </Modal>
    )
}

export default ChangeUsername;