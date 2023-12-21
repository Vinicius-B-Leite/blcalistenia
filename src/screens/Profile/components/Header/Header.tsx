import {BoxPressable} from '@/components/Box/Box';
import Text from '@/components/Text/Text';
import {useAppNavigation} from '@/hooks/useAppNavigation';
import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

const Header: React.FC = () => {
  const navigation = useAppNavigation();
  return (
    <BoxPressable onPress={() => navigation.goBack()}>
      <Text preset="secondaryTitle">{'<  '}Perfil</Text>
    </BoxPressable>
  );
};

export default Header;
