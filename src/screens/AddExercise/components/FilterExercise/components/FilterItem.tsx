import React, { memo } from 'react';
import * as S from './style'


type Props = {
    isSelected: boolean,
    selectItem: (item: string) => void,
    item: string
}

const FilterItem: React.FC<Props> = ({ isSelected, item, selectItem }) => {
    const handleSelect = () => {
        if (isSelected){
            selectItem('')
            return
        }
        selectItem(item)
    }
    return (
        <S.ItemContainer
            selected={isSelected}
            onPress={handleSelect}>
            <S.ItemLabel>{item}</S.ItemLabel>
        </S.ItemContainer>
    )
}

export default memo(FilterItem, (prev, next) => Object.is(prev, next));