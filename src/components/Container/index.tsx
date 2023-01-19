import React from 'react';
import * as S from './styles'


type Props = {
    children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <S.Container showsVerticalScrollIndicator={false}>
            {children}
        </S.Container>
    )
}

export default Container;