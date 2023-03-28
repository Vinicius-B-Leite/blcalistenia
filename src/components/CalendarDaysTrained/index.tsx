import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useTheme } from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { HistoricContext } from '../../contexts/HistoricContext';
import { MarkedDates } from 'react-native-calendars/src/types';


type Props = {
    visible: boolean,
    closeCalendar: () => void
}



const CalendarDaysTrained = ({ visible, closeCalendar }: Props) => {
    const theme = useTheme()
    const top = useSharedValue(Dimensions.get('screen').height / -1.5)
    const { getDatesTrained } = useContext(HistoricContext)
    const [markedDates, setMarkedDates] = useState<MarkedDates>({})

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value
        }
    })

    useEffect(() => {
        setMarkedDates(getDatesTrained({
            selected: false,
            marked: true,
            dotColor: theme.colors.contrast
        }))


        top.value = withTiming(0, { duration: 1000 })

        return () => { top.value = withTiming(Dimensions.get('screen').height / -1.5, { duration: 1000 }) }

    }, [])

    return visible ? (

        <Animated.View style={[animatedStyle, styles.container]}>
            <Calendar
                theme={{
                    backgroundColor: theme.colors.darkBackground,
                    arrowColor: theme.colors.darkContrast,
                    calendarBackground: theme.colors.darkBackground,
                    todayTextColor: theme.colors.text,
                    dayTextColor: theme.colors.text,
                    textSectionTitleColor: theme.colors.darkContrast,
                    textDisabledColor: theme.colors.darkText,
                    monthTextColor: theme.colors.contrast,
                    todayBackgroundColor: theme.colors.contrast
                }}
                style={{
                    backgroundColor: theme.colors.darkBackground
                }}
                initialDate={new Date().toString()}
                onDayPress={day => {
                }}
                onDayLongPress={day => {
                }}
                monthFormat={'MMMM'}
                onMonthChange={month => {
                }}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                markedDates={markedDates}
            />

            <TouchableOpacity activeOpacity={0} style={[styles.closeButton, { backgroundColor: theme.colors.darkBackground }]} onPressIn={closeCalendar} />
        </Animated.View>
    ) : <></>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%'
    },
    closeButton: {
        flex: 1,
        opacity: 0.9
    }
})

export default CalendarDaysTrained;