import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { AuthContext } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Models';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile: React.FC<NavigationProps> = ({ navigation }) => {

    const theme = useTheme()
    const { user } = useContext(AuthContext)
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

    return (
        <S.Container>
            <S.Header onPress={() => navigation.goBack()}>
                <S.Title>{'<  '}Perfil</S.Title>
            </S.Header>
            <S.ButtonChangeImage>
                <S.Avatar
                    source={{ uri: user.photoURI }}
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