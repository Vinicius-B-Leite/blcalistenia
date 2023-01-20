import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import CreateWorkout from '../../screens/CreateWorkout';
import Home from '../../screens/Home';
import { RootStackParamList } from '../Models';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

const HomeStack: React.FC = () => {
    return (
        <Navigator
            screenOptions={{
                cardOverlayEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
                
            }}
        >
            <Screen name='Home' component={Home} />
            <Screen name='CreateWorkout' component={CreateWorkout} />
        </Navigator>
    )
}

export default HomeStack;