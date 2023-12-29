import React from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';

import {
  BoxPressable,
  Text,
  Box,
  Button,
  FormInput,
  ModalBase,
} from '@/components';
import {useForm} from 'react-hook-form';
import {ChangeUserNameSchema, changeUserNameSchema} from './schema';
import {zodResolver} from '@hookform/resolvers/zod';

type ChangeUsernameProps = ModalProps & {
  changeName: (newName: string) => Promise<void>;
};
const ChangeUsername: React.FC<ChangeUsernameProps> = ({
  changeName,
  ...modalProps
}) => {
  const {control, handleSubmit} = useForm<ChangeUserNameSchema>({
    defaultValues: {
      newUsername: '',
    },
    resolver: zodResolver(changeUserNameSchema),
  });
  return (
    <ModalBase
      {...modalProps}
      position="bottom"
      boxProps={{
        paddingHorizontal: 24,
        paddingVertical: 34,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        width: '100%',
      }}>
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
    </ModalBase>
  );
};

export default ChangeUsername;
