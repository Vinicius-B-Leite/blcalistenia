import {  NavigatorScreenParams } from '@react-navigation/native';
import { WorkoutType } from '../../models/WorkoutType';


export type RootStackParamList = {
    Home: undefined,
    Workout: {
        workout?: WorkoutType | undefined
    },
    AddExercise: undefined, 

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