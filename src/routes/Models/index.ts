import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
    Home: undefined,
    CreateWorkout: undefined,
    AddExercise: undefined
};

export type TabParamList = {
    Home: NavigatorScreenParams<RootStackParamList>,
    Dashboard: undefined,
    Historic: undefined,
  };