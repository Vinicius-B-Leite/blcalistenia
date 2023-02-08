import React, { useContext, useRef } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { AuthContext } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Models';
import { pickeImage } from '../../utils/pickImage';
import FastImage from 'react-native-fast-image';



type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile: React.FC<NavigationProps> = ({ navigation }) => {

    const theme = useTheme()
    const { user, changePhoto } = useContext(AuthContext)
    const OPTIONS = [
        {
            title: 'Nome de usuário',
            icon: <Feather name='user' size={theme.sizes.icons.md} color={theme.colors.contrast} />
        },
        {
            title: 'Tema',
            icon: <Feather name='sun' size={theme.sizes.icons.md} color={theme.colors.contrast} />
        },
        {
            title: 'Sincronizar na nuvem',
            icon: <Feather name='upload-cloud' size={theme.sizes.icons.md} color={theme.colors.contrast} />
        },
    ]

    const handlePickImage = async () => {
        const image = await pickeImage()
        if (image.assets && image.assets[0].uri) {
            changePhoto(image.assets[0].uri)
            console.log(user.photoURI)
        }
    }

    return (
        <S.Container>
            <S.Header onPress={() => navigation.goBack()}>
                <S.Title>{'<  '}Perfil</S.Title>
            </S.Header>
            <S.ButtonChangeImage onPress={handlePickImage}>
                <S.Avatar
                    source={{
                        uri: user.photoURI,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </S.ButtonChangeImage>
            <S.Username>{user.username}</S.Username>
            <FlatList
                data={OPTIONS}
                contentContainerStyle={{ padding: '5%' }}
                renderItem={({ item }) => (
                    <S.OptionContainer>
                        <S.Left>{item.icon}</S.Left>
                        <S.OptionTitle>{item.title}</S.OptionTitle>
                    </S.OptionContainer>
                )}
            />
        </S.Container>
    )
}

export default Profile;