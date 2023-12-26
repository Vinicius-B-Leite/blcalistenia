import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {Rest, Profile, Workout, Home, AddExercise} from '@/screens';
import {RootStackParamList} from '../Models';

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="AddExercise" component={AddExercise} />
      <Screen name="Workout" component={Workout} />
      <Screen name="Rest" component={Rest} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export default HomeStack;
