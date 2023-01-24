import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import AddExercise from '../../screens/AddExercise';
import CreateWorkout from '../../screens/CreateWorkout';
import Home from '../../screens/Home';
import Workout from '../../screens/Workout';
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
            <Screen name='Workout' component={Workout} />
        </Navigator>
    )
}

export default HomeStack;