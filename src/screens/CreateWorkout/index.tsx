import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/Models';
import AddExercise from '../AddExercise';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Navigation = StackScreenProps<RootStackParamList, 'CreateWorkout'>

const CreateWorkout: React.FC<Navigation> = ({ route, navigation }) => {
    const theme = useTheme()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <S.Container>
                <S.Header>
                    <S.Left>
                        <S.GoBack onPress={() => navigation.goBack()}>
                            <AntDesign name='arrowleft' size={theme.sizes.icons.md} color={theme.colors.contrast} />
                        </S.GoBack>
                        <S.Title
                            placeholder='Título do treino'
                            placeholderTextColor={theme.colors.darkContrast}
                        />
                    </S.Left>
                    <Feather name='image' size={theme.sizes.icons.sm} color={theme.colors.contrast} />
                </S.Header>

                <S.AnotationContainer>
                    <S.Anotation
                        placeholder='Anotação'
                        placeholderTextColor={theme.colors.darkText}
                    />
                </S.AnotationContainer>

                <FlatList
                    data={[]}
                    renderItem={() => <View />}
                    ListFooterComponent={() => (
                        <S.AddExerciseButton onPress={() => navigation.navigate('AddExercise')}>
                            <S.AddExerciseText>Adiconar exercício</S.AddExerciseText>
                        </S.AddExerciseButton>
                    )}
                />

            </S.Container>

        </GestureHandlerRootView>
    )
}

export default CreateWorkout;