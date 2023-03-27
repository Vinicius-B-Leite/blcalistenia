import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../../routes/Models';
import * as S from './style'


type Navigation = StackNavigationProp<RootStackParamList, 'Home'>

const ListEmptyComponent: React.FC = () => {
    const navigation = useNavigation<Navigation>()

    return (
        <S.Container onPressIn={() => navigation.navigate('CreateWorkout', { workout: undefined })}>
            <S.Banner
                source={{uri: 'https://t4.ftcdn.net/jpg/03/37/55/05/360_F_337550559_PvlwclphnxWPMYz4ZSYsSBygld4R7Y4M.jpg'}}
                resizeMode={FastImage.resizeMode.cover}
            />
            <S.TextContainer>
                <S.Text >Crie um treino</S.Text>
            </S.TextContainer>
        </S.Container>
    )
}

export default ListEmptyComponent;