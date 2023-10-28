import { addExercise } from "@/features/Workout/workoutSlicer"
import { useAppNavigation } from "@/hooks/useAppNavigation"
import { ExerciseType } from "@/models/ExerciseType"
import { useRealm } from "@/services/realm/realm"
import { initialsExercises } from "@/utils/initialsExercises"
import { Alert } from "react-native"
import { useDispatch } from "react-redux"

export default function useExercise() {
    const navigation = useAppNavigation()
    const dispatch = useDispatch()
    const realm = useRealm()

    const deleteExercise = (exerciseId: string) => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Exercise', exerciseId))
        })
    }

    const handleAddExercise = (exerciseId: string) => {
        dispatch(addExercise({ exercise_id: exerciseId, series: [{ rep: 0, rest: 0, serie: 1, done: false }], anotation: '' }))
        navigation.goBack()
    }

    const handleDelete = (exercise: ExerciseType) => {
        if (initialsExercises.includes(exercise)) return
        Alert.alert(
            'Deletar exercício',
            'Você deseja deletar o exercício ' + exercise.name,
            [
                {
                    text: 'Sim',
                    onPress: () => deleteExercise(exercise._id)
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

    return {
        handleAddExercise,
        handleDelete
    }
}