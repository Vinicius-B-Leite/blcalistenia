import React, {useEffect} from 'react';
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
import Toast from 'react-native-toast-message';

type ChangeUsernameProps = ModalProps & {
  changeName: (newName: string) => Promise<void>;
};
const ChangeUsername: React.FC<ChangeUsernameProps> = ({
  changeName,
  ...modalProps
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ChangeUserNameSchema>({
    defaultValues: {
      newUsername: '',
    },
    resolver: zodResolver(changeUserNameSchema),
  });

  useEffect(() => {
    if (errors.newUsername?.message) {
      Toast.show({
        type: 'error',
        props: {message: errors.newUsername?.message},
      });
    }
  }, [errors]);
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
