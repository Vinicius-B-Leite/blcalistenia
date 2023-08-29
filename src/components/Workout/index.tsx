import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { WorkoutType } from '../../models/WorkoutType';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'
import { useDispatch } from 'react-redux'
import { useRealm } from '../../services/realm';




type Props = {
    data: WorkoutType,
}

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>

const Workout: React.FC<Props> = ({ data }) => {
    const navigation = useNavigation<Navigation>()
    const realm = useRealm()

    const deleteWorkout = (workoutID: string) => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', workoutID))
        })
    }

    const handleDelete = () => {
        Alert.alert(
            'Deletar',
            'Deseja deletar o treino ' + data.title + '?',
            [
                {
                    text: 'Sim',
                    onPress: () => deleteWorkout(data._id),
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }
    return (
        <S.Container
            onPress={() => navigation.navigate('Workout', { workout: data })}
            onLongPress={handleDelete}>
            <S.Banner
                source={{
                    uri: data.banner.length > 0 ? data.banner : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png',
                }}
                resizeMode={FastImage.resizeMode.cover}

            />
            <S.TextContainer>
                <S.Text >{data.title}</S.Text>
            </S.TextContainer>
        </S.Container>
    )
}

export default memo(Workout, (p, n) => Object.is(p, n));