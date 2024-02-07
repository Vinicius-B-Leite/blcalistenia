import React from 'react';

import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {useAppNavigation, useAppTheme} from '@/hooks';
import {useAuth} from '@/contexts';
import {BoxPressable, Box, CircleImage, Text, Icon} from '@/components';

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

        <Box justifyContent="center" maxWidth={'70%'}>
          <Text preset="pSmall">Bem-vindo</Text>
          <Text preset="pMedium" bold numberOfLines={1}>
            {user?.username}
          </Text>
        </Box>
      </BoxPressable>

      <BoxPressable onPress={openCalendar} testID="openCalendarBtn">
        <Icon family="AntDesign" color={'text'} size={24} name="calendar" />
      </BoxPressable>
    </Box>
  );
};

export default Header;
