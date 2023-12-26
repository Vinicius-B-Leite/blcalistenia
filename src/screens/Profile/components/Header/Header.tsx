import {BoxPressable, Text} from '@/components';

import {useAppNavigation} from '@/hooks';
import React from 'react';


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
