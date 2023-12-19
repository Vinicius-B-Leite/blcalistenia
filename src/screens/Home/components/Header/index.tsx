import React from 'react';
import * as S from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'styled-components/native';

import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import {useAuth} from '@/contexts/AuthContext';

type HeaderProps = {
  openCalendar: () => void;
};

const Header: React.FC<HeaderProps> = ({openCalendar}) => {
  const theme = useTheme();
  const navigation = useAppNavigation();
  const {user} = useAuth();
  return (
    <S.Header>
      <S.Left
        onPress={() => navigation.navigate('HomeStack', {screen: 'Profile'})}>
        <S.Avatar
          source={user?.avatar ? {uri: user.avatar} : DefaultUserPhoto}
        />

        <S.TextContainer>
          <S.Welcome>Bem-vindo</S.Welcome>
          <S.Username>{user?.username}</S.Username>
        </S.TextContainer>
      </S.Left>

      <S.Right onPress={openCalendar}>
        <AntDesign
          size={theme.sizes.icons.md}
          color={theme.colors.text}
          name="calendar"
        />
      </S.Right>
    </S.Header>
  );
};

export default Header;
