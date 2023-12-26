import React, {useState} from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';

import {BoxPressable, Input, Text, Box, Button} from '@/components';

type ChangeUsernameProps = ModalProps & {
  changeName: (newName: string) => Promise<void>;
};
const ChangeUsername: React.FC<ChangeUsernameProps> = ({
  changeName,
  ...props
}) => {
  const [newName, setNewName] = useState('');

  return (
    <Modal {...props}>
      <BoxPressable
        onPress={props.onRequestClose}
        backgroundColor="thirdBg"
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        style={StyleSheet.absoluteFill}
      />
      <Box
        bg="primaryBg"
        paddingHorizontal={24}
        paddingVertical={34}
        style={{marginTop: 'auto'}}>
        <Text preset="pLarge" textAlign="center" mb={24}>
          Alterar nome
        </Text>

        <Input
          placeholder="Digite seu novo nome"
          value={newName}
          onChangeText={setNewName}
          boxProps={{
            backgroundColor: 'secondBg',
          }}
        />

        <Button label="Salvar" onPress={() => changeName(newName)} mt={34} />
      </Box>
    </Modal>
  );
};

export default ChangeUsername;
