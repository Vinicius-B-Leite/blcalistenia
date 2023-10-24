import React, { useCallback, useState } from 'react';
import * as S from './style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/Models';
import { useApp } from '@realm/react';
import DefaultUserPhoto from '@/assets/defaultUserPhoto.png'

type Nav = NavigationProp<RootStackParamList>
type HeaderProps = {
    openCalendar: () => void
}

const Header: React.FC<HeaderProps> = ({ openCalendar }) => {
    const theme = useTheme()
    const navigation = useNavigation<Nav>()
    const app = useApp()
    const [user, setUser] = useState(app.currentUser?.customData)


    useFocusEffect(useCallback(() => {
        setUser(app.currentUser?.customData)
    }, []))

    return (
        <S.Header>
            <S.Left onPressIn={() => navigation.navigate('Profile')} >
                <S.Avatar source={user?.avatar ? { uri: user?.avatar as string } : DefaultUserPhoto} />

                <S.TextContainer>
                    <S.Welcome>Bem-vindo</S.Welcome>
                    <S.Username>{user?.username as string || 'Desconhecido'}</S.Username>
                </S.TextContainer>

            </S.Left>

            <S.Right onPressIn={openCalendar}>
                <AntDesign size={theme.sizes.icons.md} color={theme.colors.text} name='calendar' />
            </S.Right>
        </S.Header>
    )
}

export default Header;