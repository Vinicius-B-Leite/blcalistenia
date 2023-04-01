import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as S from './styles'
import { View } from 'react-native'
import { HistoricContext } from '../../contexts/HistoricContext';
import { HistoricType } from '../../models/HistoricType';
import HistoricItem from '../../components/HistoricItem';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { WorkoutType } from '../../models/WorkoutType';
import ExerciseInWorkoutItem from '../../components/ExerciseInWorkoutItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTabBar } from '../../contexts/TabBarContext';


const Historic: React.FC = () => {
    const { getHistoric } = useContext(HistoricContext)
    const [historic, setHistoric] = useState<HistoricType[]>([])
    const bottomsheetRef = useRef<BottomSheetRefProps>(null)
    const [bottomSheetItem, setBottomSheetItem] = useState<HistoricType | null>(null)

    useFocusEffect(useCallback(() => {
        const historicCache = getHistoric()
        historicCache && setHistoric(historicCache)
    }, []))


    return (
        <GestureHandlerRootView style={{ flex: 1 }} >

            <S.Container>
                <S.Header>
                    <S.Title>Histórico</S.Title>
                    <S.FilterButton>
                        <S.FilterText>data</S.FilterText>
                    </S.FilterButton>
                </S.Header>
                <S.HistoricListContainer>
                    <FlashList
                        nestedScrollEnabled
                        estimatedItemSize={20}
                        data={historic}
                        renderItem={({ item }) => <HistoricItem item={item} onClick={(bsItem) => {
                            setBottomSheetItem(bsItem)
                            bottomsheetRef.current?.scrollTo(300, 1000)
                        }} />}
                    />
                </S.HistoricListContainer>
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
        <S.WorkoutContainer>
            <S.WorkoutHeader>
                <S.WorkoutName>{workout.title}</S.WorkoutName>
                <S.WorkoutTime>{minutes}:{seconds}</S.WorkoutTime>
            </S.WorkoutHeader>
            <S.WorkoutAnotation>{workout.anotation}</S.WorkoutAnotation>
            <FlashList
                data={workout.exercises}
                estimatedItemSize={10}
                nestedScrollEnabled
                renderItem={({ item }) => <ExerciseInWorkoutItem
                    item={item}
                    showCreateSerie={false}
                    showDeleteSerieButton={false}
                    showRest={false}
                    showSucessButton={false}
                    showDeleteExerciseBtn={false}
                />}
            />
        </S.WorkoutContainer>
    )

}
export default Historic;