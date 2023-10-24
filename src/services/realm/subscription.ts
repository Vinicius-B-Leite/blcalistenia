export const addSubs = async (realm: Realm, userId: string) => {
    await realm.subscriptions.update((sub, realm) => {
        const historicToSync = realm.objects('Historic').filtered(`user_id == '${userId}'`)
        const workoutToSync = realm.objects('Workout').filtered(`user_id == '${userId}'`)
        const exercisesToSync = realm.objects('Exercise').filtered(`user_id == '${userId}'`)

        sub.add(historicToSync, { name: 'historic-Teste' })
        sub.add(exercisesToSync, { name: 'exercises-Teste' })
        sub.add(workoutToSync, { name: 'Workout-TEste' })
    })
}