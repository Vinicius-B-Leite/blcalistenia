import { MaterialTopTabBarProps, MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTabBar } from '../../contexts/TabBarContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Models';
import { TabParamList } from '../../routes/Models';
import { WorkoutType } from '../../models/WorkoutType';

type TabBarProps = MaterialTopTabBarProps
const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors, sizes } = useTheme()
    const { isTabBarVisible } = useTabBar()

    const isWorkingout = useSelector((state: RootState) => state.workout.isWorkingout)
    const workoutCopy = useSelector((state: RootState) => state.workout.workoutCopy)
    const timer = useSelector((state: RootState) => state.workout.timer)


    if (!isTabBarVisible || !timer) {
        return <></>
    }

    

    return (
        <>
            {
                isWorkingout && state.routes[0].state?.index != 2 && state.routes[0].state?.index != 1 && (
                    <S.GoWorkout onPress={() => navigation.navigate('HomeStack', { screen: 'Workout', params: { workout: workoutCopy } })} >
                        <View>
                            <S.TitleGoWorkout>Voltar ao treino</S.TitleGoWorkout>
                            <S.SubtitleGoWorkout >{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</S.SubtitleGoWorkout>
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