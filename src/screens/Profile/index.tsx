import React, {useState} from 'react';

import ThemeSelect from './components/ThemeSelect';
import ChangeUsername from './components/ChangeUsername';
import Container from '@/components/Container/Container';
import useProfile from './useProfile';

import {useAuth} from '@/contexts/AuthContext';
import Avatar from './components/Avatar/Avatar';
import Text from '@/components/Text/Text';

import Header from './components/Header/Header';
import Options from './components/Options/Options';

const Profile: React.FC = () => {
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const {user} = useAuth();
  const {
    handleChangeName,
    handlePickImage,
    showChangeUsername,

    openChangeUsernameModal,
    closeChangeUsernameModal,
  } = useProfile();

  return (
    <Container>
      <Header />
      <Avatar avatar={user?.avatar || ''} handlePickImage={handlePickImage} />

      <Text preset="pLarge" textAlign="center" mt={14} mb={24}>
        {user?.username}
      </Text>

      <Options
        iconName="user"
        label="Nome de usuário"
        onPress={openChangeUsernameModal}
      />
      <Options
        iconName="sun"
        label="Tema"
        onPress={() => setShowThemeSelect(true)}
      />

      <ChangeUsername
        visible={showChangeUsername}
        onRequestClose={closeChangeUsernameModal}
        animationType="slide"
        transparent
        changeName={newName => handleChangeName(newName)}
      />
      <ThemeSelect
        transparent
        animationType="fade"
        visible={showThemeSelect}
        onRequestClose={() => setShowThemeSelect(false)}
      />
    </Container>
  );
};

export default Profile;
