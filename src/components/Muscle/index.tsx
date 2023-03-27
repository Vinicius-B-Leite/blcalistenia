import React from 'react';
import * as S from './styles'

type Props = {
    muscle: string,
    muscleSelected: string,
    onClick: (muscle: string) => void
}

const Muscle = ({ muscle, muscleSelected, onClick }: Props) => {
    return (
        <S.Container  selected={muscle == muscleSelected} onPressIn={() => onClick(muscle)}>
            <S.MuscleName selected={muscle == muscleSelected}>{muscle}</S.MuscleName>
        </S.Container>
    )
}

export default Muscle;