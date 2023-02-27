import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { WorkoutSeasonContext } from '../../contexts/WorkooutSeason'
import * as S from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

type TabBarProps = MaterialTopTabBarProps
const TabBar: React.FC<TabBarProps> = ({ state, descriptors, position, navigation }) => {
    const { colors, sizes } = useTheme()
    const { workoutCopy } = useContext(WorkoutSeasonContext)
    return (
        <>
            {
                workoutCopy && (
                    <S.GoWorkout onPress={() => navigation.navigate('HomeStack', { screen: 'WorkoutSeason' })} >
                        <View>
                            <S.TitleGoWorkout>Handstand pushup</S.TitleGoWorkout>
                            <S.SubtitleGoWorkout >Voltar ao treino - 38:03</S.SubtitleGoWorkout>
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
                            <TouchableOpacity onPress={onPress}>
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