import React, {useContext} from 'react';
import {Modal, ModalProps} from 'react-native';
import {ThemeContext, ThemeType} from '@/contexts';

import {BoxPressable, Box, Text, ModalBase} from '@/components';

type Props = ModalProps;
const ThemeSelect: React.FC<Props> = props => {
  const {toggleTheme, theme} = useContext(ThemeContext);

  const themesOptions: [ThemeType, ThemeType] = ['dark', 'light'];

  return (
    <ModalBase
      {...props}
      position="center"
      boxProps={{
        width: 300,
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}>
      {themesOptions.map((t, i) => (
        <BoxPressable
          key={t}
          flexDirection="row"
          gap={14}
          mb={i === 0 ? 24 : undefined}
          onPress={() => toggleTheme(t)}>
          <Box
            borderWidth={2}
            width={30}
            height={30}
            borderRadius={'full'}
            borderColor={t === theme ? 'contrast' : 'secondText'}
            justifyContent="center"
            alignItems="center">
            <Box
              borderWidth={2}
              width={20}
              height={20}
              borderRadius={'full'}
              bg={t === theme ? 'contrast' : 'secondText'}
            />
          </Box>
          <Text preset="pLarge" color={t === theme ? 'contrast' : 'secondText'}>
            {t === 'dark' ? 'Escuro' : 'Claro'}
          </Text>
        </BoxPressable>
      ))}
    </ModalBase>
  );
};

export default ThemeSelect;
