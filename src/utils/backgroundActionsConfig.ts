export const options = {
    taskName: 'Cronometro',
    taskTitle: 'Volte ao treino',
    taskDesc: 'Tempo: ',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#FF8A00',
    linkingURI: 'blcalistenia://home/WorkoutSeason', // See Deep Linking for more info
};

export const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
