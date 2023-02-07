import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native'
import * as S from './styles'
import { HistoricContext } from '../../contexts/HistoricContext';
import { HistoricType } from '../../models/HistoricType';
import HistoricItem from '../../components/HistoricItem';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { WorkoutType } from '../../models/workout';
import Exercise from '../../components/Exercise';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';


const Historic: React.FC = () => {
    const { getHistoric } = useContext(HistoricContext)
    const [historic, setHistoric] = useState<HistoricType[]>([])
    const bottomsheetRef = useRef<BottomSheetRefProps>(null)
    const [bottomSheetItem, setBottomSheetItem] = useState<HistoricType | null>(null)

    useEffect(() => {
        getHistoric().then(realmHistoric => setHistoric(realmHistoric))
    }, [])


    return (
        <GestureHandlerRootView style={{ flex: 1 }} >

            <S.Container>
                <S.Header>
                    <S.Title>Histórico</S.Title>
                    <S.FilterButton>
                        <S.FilterText>data</S.FilterText>
                    </S.FilterButton>
                </S.Header>
                <FlatList
                    contentContainerStyle={{ padding: '5%' }}
                    data={historic}
                    renderItem={({ item }) => <HistoricItem item={item} onClick={(bsItem) => {
                        setBottomSheetItem(bsItem)
                        bottomsheetRef.current?.scrollTo(300, 1000)
                    }} />}
                />
                {
                    bottomSheetItem &&
                    <BottomSheet ref={bottomsheetRef} >
                        <HistoricBottomSheetItem item={bottomSheetItem} />
                    </BottomSheet>
                }
            </S.Container>
        </GestureHandlerRootView>

    )
}


const HistoricBottomSheetItem = ({ item }: { item: HistoricType }) => {
    const workout: WorkoutType = JSON.parse(item.workout)

    const minutes = String((item.timerInSeconds / 60).toFixed(0)).padStart(2, '0')
    const seconds = String((item.timerInSeconds % 60).toFixed(0)).padStart(2, '0')

    return (
        <>
            <S.WorkoutHeader>
                <S.WorkoutName>{workout.title}</S.WorkoutName>
                <S.WorkoutTime>{minutes}:{seconds}</S.WorkoutTime>
            </S.WorkoutHeader>
            <S.WorkoutAnotation>{workout.anotation}</S.WorkoutAnotation>
            <FlatList
                data={workout.exercises}
                renderItem={({ item }) => <ExerciseInWorkoutItem
                    item={item}
                    showCreateSerie={false}
                    showDeleteSerieButton={false}
                    showRest={false}
                    showSucessButton={false}
                />}
            />
        </>
    )

}
export default Historic;