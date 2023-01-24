import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
    Home: undefined,
    CreateWorkout: {
        workout_id?: Number
    },
    AddExercise: undefined,
    Workout: {
        workout_id: Number
    }
};

export type TabParamList = {
    HomeStack: NavigatorScreenParams<RootStackParamList>,
    Dashboard: undefined,
    Historic: undefined,
  };