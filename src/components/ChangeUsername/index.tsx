import React, {useState} from 'react';
import {Modal, ModalProps} from 'react-native';
import {useTheme} from 'styled-components/native';
import * as S from './style';

type ChangeUsernameProps = ModalProps & {
  changeName: (newName: string) => Promise<void>;
};
const ChangeUsername: React.FC<ChangeUsernameProps> = ({
  changeName,
  ...props
}) => {
  const {colors} = useTheme();
  const [newName, setNewName] = useState('');

  return (
    <Modal {...props}>
      <S.CloseModal onPress={props.onRequestClose} />
      <S.Container>
        <S.Title>Alterar nome</S.Title>

        <S.Input
          placeholder={'Desconhecido'}
          value={newName}
          onChangeText={setNewName}
          placeholderTextColor={colors.darkText}
        />

        <S.Submit onPress={() => changeName(newName)}>
          <S.Label>Salvar</S.Label>
        </S.Submit>
      </S.Container>
    </Modal>
  );
};

export default ChangeUsername;
