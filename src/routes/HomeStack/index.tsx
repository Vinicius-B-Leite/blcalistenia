import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '../Models';
import {
  AddExerciseScreen,
  HomeScreen,
  ProfileScreen,
  RestScreen,
  WorkoutScreen,
} from '@/screens';

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
      <Screen name="Home" component={HomeScreen} />
      <Screen name="AddExercise" component={AddExerciseScreen} />
      <Screen name="Workout" component={WorkoutScreen} />
      <Screen name="Rest" component={RestScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
};

export default HomeStack;
