import React, { memo } from 'react';
import * as S from './styles'

type Props = {
    muscle: string,
    muscleSelected: string,
    onClick: (muscle: string) => void
}

const Muscle = ({ muscle, muscleSelected, onClick }: Props) => {

    const isSelected = muscle === muscleSelected

    return (
        <S.Container selected={isSelected} onPress={() => onClick(muscle)}>
            <S.MuscleName selected={isSelected}>{muscle}</S.MuscleName>
        </S.Container>
    )
}
export default memo(Muscle, (prv, nxt) => Object.is(prv, nxt))