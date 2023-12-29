import { SuggestWorkoutType } from "../models/SuggestsWorkoutType";
import uuid from 'react-native-uuid'


export const suggests: SuggestWorkoutType[] = [
    {
        level: 'begginer',
        _id: String(uuid.v4()),
        workout: JSON.stringify({
            _id: 'suggestWorkout1',
            banner: 'https://previous-assets.menshealth.pt/files/2017/09/iStock-1094479308.jpg',
            title: 'Flexão',
            exercises: [
                {
                    exercise_id: 'Flexão com joelhos no chão',
                    series: [
                        {
                            rep: 6,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Flexão enclinada na parede',
                    series: [
                        {
                            rep: 6,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Flexão excêntrica',
                    series: [
                        {
                            rep: 2,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 2,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 2,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
            ]
        })
    },
    {
        level: 'begginer',
        _id: String(uuid.v4()),
        workout: JSON.stringify({
            _id: 'suggestWorkout2',
            banner: 'https://www.blog.bioritmo.com.br/wp-content/uploads/2021/10/shutterstock_753521752-1.jpg',
            title: 'Barra fixa',
            exercises: [
                {
                    exercise_id: 'Barra excêntrica',
                    series: [
                        {
                            rep: 6,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Barra australiana',
                    series: [
                        {
                            rep: 8,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Ativamento de escápula',
                    series: [
                        {
                            rep: 10,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
            ]
        })
    },
    {
        level: 'intermate',
        _id: String(uuid.v4()),
        workout: JSON.stringify({
            _id: 'suggestWorkout3',
            banner: 'https://img.freepik.com/premium-photo/man-doing-handstand-push-ups-bars_126745-1514.jpg?w=2000',
            title: 'Handstand pushup',
            exercises: [
                {
                    exercise_id: 'HSPU excêntrica',
                    series: [
                        {
                            rep: 3,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 3,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 3,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'HSPU na parede',
                    series: [
                        {
                            rep: 6,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Flexão pike elevada',
                    series: [
                        {
                            rep: 10,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Flexão pike ',
                    series: [
                        {
                            rep: 8,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
            ]
        })
    },
    {
        level: 'intermate',
        _id: String(uuid.v4()),
        workout: JSON.stringify({
            _id:'suggestWorkout4' ,
            banner: 'https://media.istockphoto.com/id/1196816311/pt/foto/athlete-doing-a-typewriter-archer-pull-up.jpg?s=170667a&w=0&k=20&c=ssP4GKcTN4O4qyDgnZX6P3S4BkZCiE23UocNqlWjw8g=',
            title: 'Barra arqueira',
            exercises: [
                {
                    exercise_id: 'Barra arqueira assistida',
                    series: [
                        {
                            rep: 5,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 5,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 5,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Barra arqueira excêntrica',
                    series: [
                        {
                            rep: 6,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 6,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Barra explosiva',
                    series: [
                        {
                            rep: 10,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 10,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
                {
                    exercise_id: 'Barra fixa',
                    series: [
                        {
                            rep: 8,
                            rest: 120,
                            serie: 1
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 2
                        },
                        {
                            rep: 8,
                            rest: 120,
                            serie: 3
                        }
                    ]
                },
            ]
        })
    },
]