import React, { useContext } from 'react';
import { View } from 'react-native';
import { WorkoutContext } from '../../Contexts/WorkoutContext';
import * as S from './styles'


const CreateWorkoutButton: React.FC = () => {

    const { createWorkout } = useContext(WorkoutContext)
    return (
        <S.Container onPress={() => createWorkout({
            title: 'sei la',
            banner: 'https://s2.glbimg.com/2yK3rTPvEDofzpusIhAgrkasz9A=/e.glbimg.com/og/ed/f/original/2019/09/30/oriontree_fairbairn_960.jpg',
            exercises: [
                {
                    name: 'LKlkfsda',
                    series: [
                        {
                            rep: 1,
                            rest: 1,
                            serie: 1,
                        }
                    ],
                    type: 'old',
                }
            ]
        })}>
            <S.Icon>+</S.Icon>
        </S.Container>
    )
}

export default CreateWorkoutButton;