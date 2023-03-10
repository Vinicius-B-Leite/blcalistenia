import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import AddExercise from '../../screens/AddExercise';
import CreateWorkout from '../../screens/CreateWorkout';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Rest from '../../screens/Rest';
import WorkoutSeason from '../../screens/WorkoutSeason';
import { RootStackParamList } from '../Models';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

const HomeStack: React.FC = () => {
    return (
        <Navigator
            screenOptions={{
                cardOverlayEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
                detachPreviousScreen: false,
                cardStyle: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <Screen name='Home' component={Home} />
            <Screen name='AddExercise' component={AddExercise} />
            <Screen name='CreateWorkout' component={CreateWorkout} />
            <Screen name='WorkoutSeason' component={WorkoutSeason} />
            <Screen name='Rest' component={Rest} />
            <Screen name='Profile' component={Profile} />
        </Navigator>
    )
}

export default HomeStack;