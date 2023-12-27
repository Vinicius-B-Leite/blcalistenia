import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {useAppNavigation, useAppTheme} from '@/hooks';
import {useAuth} from '@/contexts';
import {BoxPressable, Box, CircleImage, Text} from '@/components';

type HeaderProps = {
  openCalendar: () => void;
};

const Header: React.FC<HeaderProps> = ({openCalendar}) => {
  const theme = useAppTheme();
  const navigation = useAppNavigation();
  const {user} = useAuth();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pb={14}>
      <BoxPressable
        flexDirection="row"
        g={14}
        onPress={() => navigation.navigate('HomeStack', {screen: 'Profile'})}>
        <CircleImage
          size={60}
          source={user?.avatar ? {uri: user.avatar} : DefaultUserPhoto}
        />

        <Box justifyContent="center">
          <Text preset="pSmall">Bem-vindo</Text>
          <Text preset="pMedium" bold>
            {user?.username}
          </Text>
        </Box>
      </BoxPressable>

      <BoxPressable onPress={openCalendar}>
        <AntDesign
          style={{fontSize: 24}}
          color={theme.colors.text}
          name="calendar"
        />
      </BoxPressable>
    </Box>
  );
};

export default Header;
