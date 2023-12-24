import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'styled-components/native';

import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAuth} from '@/contexts/AuthContext';
import Box, {BoxPressable} from '@/components/Box/Box';

import Text from '@/components/Text/Text';
import CircleImage from '@/components/CircleImage/CircleImage';

type HeaderProps = {
  openCalendar: () => void;
};

const Header: React.FC<HeaderProps> = ({openCalendar}) => {
  const theme = useTheme();
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
          size={theme.sizes.icons.md}
          color={theme.colors.text}
          name="calendar"
        />
      </BoxPressable>
    </Box>
  );
};

export default Header;
