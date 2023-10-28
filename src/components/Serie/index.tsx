import React, { memo } from 'react';
import { ExercisesInWorkoutType } from '../../models/ExercisesInWorkoutType';
import * as S from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'styled-components/native';;
import { SerieType } from '../../models/SerieType';
import useSerie from './useSerie';




type Props = {
    item: SerieType,
    exercise: ExercisesInWorkoutType,
    deleteSerieButton?: boolean,
}

const Serie: React.FC<Props> = ({ item, deleteSerieButton, exercise }) => {
    const theme = useTheme()

    const { handleCheckSerie, showSucessButton, handleDeleteSerie, done, rep, rest, handleOnChangeRep, handleOnChangeRest } = useSerie({ item, deleteSerieButton, exercise })

    return (
        <S.Container>
            {
                deleteSerieButton && (
                    <S.DeleteSerieButton onPress={() => handleDeleteSerie}>
                        <S.DeleteSerieText />
                    </S.DeleteSerieButton>
                )
            }

            <S.SerieInfo
                editable={false}
                defaultValue={String(item.serie)}
            />
            <S.SerieInfo
                value={String(rep)}
                onChangeText={handleOnChangeRep}
            />

            {
                showSucessButton ?
                    <S.CheckButton selected={done} onPress={handleCheckSerie}>
                        <AntDesign name='check' color={theme.colors.text} />
                    </S.CheckButton>
                    :
                    <S.SerieInfo
                        value={String(rest)}
                        onChangeText={handleOnChangeRest}
                    />
            }
        </S.Container >)
}

export default memo(Serie, (prev, nxt) => Object.is(prev, nxt));