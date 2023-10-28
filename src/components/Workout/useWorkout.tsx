import { useRealm } from '@/services/realm/realm';
import { Alert } from 'react-native';


export default function useWorkout() {
    const realm = useRealm()

    const deleteWorkout = (workoutID: string) => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Workout', workoutID))
        })
    }

    const handleDelete = (workoutTitle: string, workoutId: string) => {
        Alert.alert(
            'Deletar',
            'Deseja deletar o treino ' + workoutTitle + '?',
            [
                {
                    text: 'Sim',
                    onPress: () => deleteWorkout(workoutId),
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        )
    }

    return {
        handleDelete
    }
}