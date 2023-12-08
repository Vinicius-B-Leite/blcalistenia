import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import AddExercise from '../../screens/AddExercise';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Rest from '../../screens/Rest';
import {RootStackParamList} from '../Models';
import Workout from '../../screens/Workout';

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
