import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutType } from '../../models/WorkoutType';


export type RootStackParamList = {
    Home: undefined,
    CreateWorkout: {
        workout?: WorkoutType
    },
    AddExercise: undefined, 
    WorkoutSeason: {
        workout: WorkoutType
    },
    Rest:{
        totalSeconds: Number
    },
    Profile: undefined

};

export type TabParamList = {
    HomeStack: NavigatorScreenParams<RootStackParamList>,
    Dashboard: undefined,
    Historic: undefined,
  };