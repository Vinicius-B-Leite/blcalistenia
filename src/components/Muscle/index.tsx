import React from 'react';
import * as S from './styles'

type Props = {
    muscle: string
}

const Muscle = ({ muscle }: Props) => {
    return (
        <S.Container>
            <S.MuscleName>{muscle}</S.MuscleName>
        </S.Container>
    )
}

export default Muscle;