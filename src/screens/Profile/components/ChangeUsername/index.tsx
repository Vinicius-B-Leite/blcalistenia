import React from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';

import {BoxPressable, Text, Box, Button, FormInput} from '@/components';
import {useForm} from 'react-hook-form';
import {ChangeUserNameSchema, changeUserNameSchema} from './schema';
import {zodResolver} from '@hookform/resolvers/zod';

type ChangeUsernameProps = ModalProps & {
  changeName: (newName: string) => Promise<void>;
};
const ChangeUsername: React.FC<ChangeUsernameProps> = ({
  changeName,
  ...props
}) => {
  const {control, handleSubmit} = useForm<ChangeUserNameSchema>({
    defaultValues: {
      newUsername: '',
    },
    resolver: zodResolver(changeUserNameSchema),
  });
  return (
    <Modal {...props}>
      <BoxPressable
        onPress={props.onRequestClose}
        backgroundColor="secondBg"
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        style={StyleSheet.absoluteFill}
      />
      <Box
        bg="thirdBg"
        paddingHorizontal={24}
        paddingVertical={34}
        style={{marginTop: 'auto'}}>
        <Text preset="pLarge" textAlign="center" mb={24}>
          Alterar nome
        </Text>

        <FormInput
          control={control}
          name="newUsername"
          placeholder="Digite seu novo nome"
          boxProps={{
            backgroundColor: 'secondBg',
          }}
        />

        <Button
          label="Salvar"
          onPress={handleSubmit(data => changeName(data.newUsername))}
          mt={34}
        />
      </Box>
    </Modal>
  );
};

export default ChangeUsername;
