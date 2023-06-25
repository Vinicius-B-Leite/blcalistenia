import React from 'react';
import { View } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/Models';
import { UserType } from '../../../models/UserType';
import { useUser } from '@realm/react';


type Nav = NavigationProp<RootStackParamList>
type HeaderProps = {
    openCalendar: () => void
}

const Header: React.FC<HeaderProps> = ({ openCalendar }) => {
    const theme = useTheme()
    const navigation = useNavigation<Nav>()
    const user = useUser()
    

    return (
        <S.Header>
            <S.Left onPressIn={() => navigation.navigate('Profile')} >
                <S.Avatar source={{ uri: user?.profile?.picture as string || 'https://pbs.twimg.com/media/FOq9YuBXsBgTIQM.jpg' }} />

                <S.TextContainer>
                    <S.Welcome>Bem-vindo</S.Welcome>
                    <S.Username>{user.profile.name || 'Desconhecido'}</S.Username>
                </S.TextContainer>

            </S.Left>

            <S.Right onPressIn={openCalendar}>
                <AntDesign size={theme.sizes.icons.md} color={theme.colors.text} name='calendar' />
            </S.Right>
        </S.Header>
    )
}

export default Header;