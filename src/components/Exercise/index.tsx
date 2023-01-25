import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp} from '@react-navigation/stack';
import React, { useContext } from 'react';
import { FlatList, Alert } from 'react-native';
import { ExerciseContext } from '../../contexts/ExerciseContext';
import { WorkoutContext } from '../../contexts/WorkoutContext';
import { exercise } from '../../models/exercise';
import { RootStackParamList } from '../../routes/Models';
import * as S from './styles'


type Prosp = { item: exercise }

type Navigation = StackNavigationProp<RootStackParamList, 'AddExercise'>

const Exercise: React.FC<Prosp> = ({ item }) => {
    const navigation = useNavigation<Navigation>()
    const { addExercise } = useContext(WorkoutContext)
    const { deleteExercise } = useContext(ExerciseContext)

    const handleAddExercise = () => {
        addExercise(item.name)
        navigation.goBack()
    }

    const handleDelete = () => {
        Alert.alert(
            'Deletar exercício',
            'Você deseja deletar o exercício ' + item.name,
            [
                {
                    text: 'Sim',
                    onPress: () => deleteExercise(item.name)
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ],
            {
                cancelable: true,
            }
        )
    }

    return (
        <S.ExerciseContainer onPress={handleAddExercise} onLongPress={handleDelete}>
            <S.ExerciseName>{item.name}</S.ExerciseName>
            <FlatList
                data={item.muscles}
                horizontal
                scrollEnabled={false}
                renderItem={({ item: m }) => (
                    <S.ExerciseMuscles>{m}</S.ExerciseMuscles>
                )}
            />
        </S.ExerciseContainer >
    )
}

export default Exercise;