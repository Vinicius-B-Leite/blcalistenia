export const options = {
    taskName: 'Cronometro',
    taskTitle: 'Volte ao treino',
    taskDesc: 'Tempo: ',
    taskIcon: {
        name: '/drawable/ic_stat_name',
        type: 'mipmap',
        package: 'com.blcalistenia'
    },
    color: '#FF8A00',
    linkingURI: 'blcalistenia://home/WorkoutSeason', // See Deep Linking for more info
};

export const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
