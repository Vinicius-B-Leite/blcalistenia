import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useTheme } from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MarkedDates } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { HistoricType } from '../../models/HistoricType';
import { useRealm } from '../../contexts/RealmContext';



export type CalendarRef = {
    openCalendar: () => void
    closeCalendar: () => void
}

const CalendarDaysTrained = forwardRef<CalendarRef>(({ }, ref) => {
    const theme = useTheme()
    const top = useSharedValue(-(Dimensions.get('screen').height))
    const { realm } = useRealm()
    const getDatesTrained = (config: MarkingProps) => {
        if (realm) {
            const historics = realm.objects('Historic').toJSON() as HistoricType[]
            const dates = historics?.map(h => h.date)

            let datesConfigureds: MarkedDates = {}

            dates?.forEach(d => {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                datesConfigureds[key] = config
            })


            return datesConfigureds
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value
        }
    })

    const openCalendar = () => {
        top.value = withTiming(0, { duration: 1000 })
    }
    const closeCalendar = () => {
        top.value = withTiming(-(Dimensions.get('screen').height), { duration: 1000 })
    }
    useImperativeHandle(ref, () => ({ openCalendar, closeCalendar }), [openCalendar, closeCalendar])

    return (

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
                monthFormat={'MMMM'}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                markedDates={getDatesTrained({
                    selected: false,
                    marked: true,
                    dotColor: theme.colors.contrast
                })}
            />

            <TouchableOpacity
                activeOpacity={0}
                style={[styles.closeButton]}
                onPressIn={closeCalendar} />
        </Animated.View>
    )
})

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

export default memo(CalendarDaysTrained);