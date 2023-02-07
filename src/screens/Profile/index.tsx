import React from 'react';
import { FlatList, View } from 'react-native';
import * as S from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';


const Profile: React.FC = () => {

    const theme = useTheme()

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
            <S.Header>
                <S.Title>Perfil</S.Title>
            </S.Header>
            <S.Avatar
                source={{ uri: 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' }}
            />
            <S.Username>lkfjlksajfladsjçglk</S.Username>
            <FlatList
                data={OPTIONS}
                contentContainerStyle={{padding: '5%'}}
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