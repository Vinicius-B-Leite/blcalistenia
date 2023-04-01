import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason'
import * as S from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTabBar } from '../../contexts/TabBarContext';
import { useTimer } from '../../contexts/TimerContext';

type TabBarProps = MaterialTopTabBarProps
const TabBar: React.FC<TabBarProps> = ({ state, descriptors, position, navigation }) => {
    const { colors, sizes } = useTheme()
    const { workoutCopy } = useContext(WorkoutSeasonContext)
    const { timer } = useTimer()
    const { isTabBarVisible } = useTabBar()

    if (!isTabBarVisible) {
        return <></>
    }

    return (
        <>
            {
                workoutCopy && state.routes[0].state?.index != 2 && state.routes[0].state?.index != 1 && (
                    <S.GoWorkout onPressIn={() => navigation.navigate('HomeStack', { screen: 'WorkoutSeason', params: { workout: workoutCopy } })} >
                        <View>
                            <S.TitleGoWorkout>{workoutCopy.title}</S.TitleGoWorkout>
                            <S.SubtitleGoWorkout >Voltar ao treino - {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.SubtitleGoWorkout>
                        </View>
                        <Ionicons name='arrow-forward' color={colors.text} size={sizes.icons.xlg} />
                    </S.GoWorkout>
                )
            }
            <S.NavBar>


                {
                    state.routes.map((r, i) => {
                        const { options } = descriptors[r.key]
                        const isFocused = state.index === i;

                        const onPress = () => {
                            navigation.navigate(r.name)
                        }


                        return (
                            <TouchableOpacity onPress={onPress} key={r.key}>

                                <options.tabBarIcon color={isFocused ? colors.contrast : colors.darkContrast} />
                            </TouchableOpacity>
                        )
                    })
                }
            </S.NavBar>
        </>
    )
}

const styles = StyleSheet.create({
    navbar: {

    },

})

export default TabBar;