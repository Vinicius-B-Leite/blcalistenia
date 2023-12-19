import React, {useState} from 'react';
import * as S from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/Models';
import FastImage from 'react-native-fast-image';
import ThemeSelect from '../../components/ThemeSelect';
import ChangeUsername from '../../components/ChangeUsername';

import useProfile from './useProfile';
import {useGetUser} from '@/domains/User/useCases/useGetUser';
import {useAuth} from '@/contexts/AuthContext';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<NavigationProps> = ({navigation}) => {
  const theme = useTheme();
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
    <S.Container>
      <S.Header onPress={() => navigation.goBack()}>
        <S.Title>{'<  '}Perfil</S.Title>
      </S.Header>
      <S.ButtonChangeImage onPress={handlePickImage}>
        <S.Avatar
          source={{
            uri:
              user?.avatar || 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </S.ButtonChangeImage>
      <S.Username>{user?.username}</S.Username>

      <S.OptionContainer onPress={openChangeUsernameModal}>
        <S.Left>
          <Feather
            name="user"
            size={theme.sizes.icons.md}
            color={theme.colors.contrast}
          />
        </S.Left>
        <S.OptionTitle>Nome de usuário</S.OptionTitle>
      </S.OptionContainer>
      <S.OptionContainer onPress={() => setShowThemeSelect(true)}>
        <S.Left>
          <Feather
            name="sun"
            size={theme.sizes.icons.md}
            color={theme.colors.contrast}
          />
        </S.Left>
        <S.OptionTitle>Tema</S.OptionTitle>
      </S.OptionContainer>

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
    </S.Container>
  );
};

export default Profile;
