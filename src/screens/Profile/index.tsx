import React, { useContext, useState } from 'react';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { AuthContext } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Models';
import { pickeImage } from '../../utils/pickImage';
import FastImage from 'react-native-fast-image';
import ThemeSelect from '../../components/ThemeSelect';
import ChangeUsername from '../../components/ChangeUsername';



type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile: React.FC<NavigationProps> = ({ navigation }) => {

    const theme = useTheme()
    const { user, changePhoto } = useContext(AuthContext)
    const [showThemeSelect, setShowThemeSelect] = useState(false)
    const [showChangeUsername, setShowChangeUsername] = useState(false)

    const handlePickImage = async () => {
        const image = await pickeImage()
        if (image.assets && image.assets[0].uri) {
            changePhoto(image.assets[0].uri)
        }
    }

    return (
        <S.Container>
            <S.Header onPressIn={() => navigation.goBack()}>
                <S.Title>{'<  '}Perfil</S.Title>
            </S.Header>
            <S.ButtonChangeImage onPressIn={handlePickImage}>
                <S.Avatar
                    source={{
                        uri: user.photoURI,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </S.ButtonChangeImage>
            <S.Username>{user.username}</S.Username>

            <S.OptionContainer onPressIn={() => setShowChangeUsername(true)}>
                <S.Left>
                    <Feather name='user' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Nome de usuário</S.OptionTitle>
            </S.OptionContainer>
            <S.OptionContainer onPressIn={() => setShowThemeSelect(true)}>
                <S.Left>
                    <Feather name='sun' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Tema</S.OptionTitle>
            </S.OptionContainer>
            <S.OptionContainer>
                <S.Left>
                    <Feather name='upload-cloud' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                </S.Left>
                <S.OptionTitle>Sincronizar na nuvem</S.OptionTitle>
            </S.OptionContainer>

            <ChangeUsername  visible={showChangeUsername} onRequestClose={() => setShowChangeUsername(false)} animationType='slide' transparent/>
            <ThemeSelect transparent animationType='fade' visible={showThemeSelect} onRequestClose={() => setShowThemeSelect(false)} />
        </S.Container>
    )
}

export default Profile;