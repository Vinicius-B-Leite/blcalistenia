import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { WorkoutType } from '../../models/workout';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'

type Props = {
    data: WorkoutType,
}

type Navigation = StackNavigationProp<RootStackParamList, 'Home'>

const Workout: React.FC<Props> = ({ data }) => {
    const navigation = useNavigation<Navigation>()
    const { deleteWorkout } = useContext(WorkoutContext)

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
            onPress={() => navigation.navigate('CreateWorkout', { workout: data })}
            onLongPress={handleDelete}>
            <S.Banner
                source={{ uri: data.banner.length > 0 ? data.banner : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' }}
                resizeMode='cover'
            />
            <S.TextContainer>
                <S.Text >{data.title}</S.Text>
            </S.TextContainer>
        </S.Container>
    )
}

export default Workout;