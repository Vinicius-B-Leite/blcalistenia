import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutType } from '../../models/workout';


export type RootStackParamList = {
    Home: undefined,
    CreateWorkout: {
        workout_id?: Number
    },
    AddExercise: undefined, 
    WorkoutSeason: {
        workout: WorkoutType
    },
    Rest:{
        totalSeconds: Number
    }

};

export type TabParamList = {
    HomeStack: NavigatorScreenParams<RootStackParamList>,
    Dashboard: undefined,
    Historic: undefined,
  };